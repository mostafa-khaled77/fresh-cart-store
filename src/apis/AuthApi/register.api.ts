
import { RegisterResponse } from './../../interfaces/register.interface';
import { RegisterValues } from '@/schema/Register.schema';

export default async function RegisterUser(values: RegisterValues,): Promise<RegisterResponse> {
  const res = await fetch(
    `${process.env.BASE_URL}/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    },
  );
  let data = await res.json();

  return data;
}