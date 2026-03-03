"use server";

import { z } from "zod";

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
    // TODO: Implement Firebase Firestore logic here
    // Example:
    // import { firestore } from '@/lib/firebase';
    // await firestore.collection('newsletter_subscriptions').add({
    //   name,
    //   email,
    //   subscribedAt: new Date(),
    // });

    console.log("Subscribing user:", { name, email });

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
