"use server";

import { z } from "zod";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeFirebase } from "@/firebase";

const subscribeSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
});

export type SubscribeState = {
  message: string;
  status: "success" | "error";
} | {
  message: null;
  status: null;
};

export async function subscribeToNewsletter(
  prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const validatedFields = subscribeSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.email?.[0] || validatedFields.error.flatten().fieldErrors.name?.[0] || "Erro de validação.",
      status: "error",
    };
  }
  
  const { name, email } = validatedFields.data;

  try {
    const { firestore } = initializeFirebase();
    await addDoc(collection(firestore, "newsletter_subscriptions"), {
      name,
      email,
      subscriptionDate: new Date(),
    });

    return {
      message: "Obrigado por se inscrever!",
      status: "success",
    };
  } catch (error) {
    console.error("Subscription error:", error);
    return {
      message: "Ocorreu um erro. Por favor, tente novamente.",
      status: "error",
    };
  }
}
