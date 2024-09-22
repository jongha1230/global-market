import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (typeof data.email !== "string" || typeof data.password !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { email, password } = data;

  const supabase = createClient();
  const {
    data: { user },
    error: signInError,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    console.error("Detailed sign-in error:", signInError);
    return NextResponse.json(
      {
        error: signInError.message,
        errorCode: signInError.status,
        details: signInError,
      },
      { status: signInError.status || 400 }
    );
  }

  if (!user) {
    return NextResponse.json(
      { message: "Sign in process initiated, but no data returned" },
      { status: 200 }
    );
  }

  const { data: userData, error: fetchError } = await supabase
    .from("users")
    .select("nickname, address")
    .eq("id", user.id)
    .single();

  if (fetchError) {
    console.error("Error fetching user data:", fetchError);
    return NextResponse.json(
      { error: "Error fetching user data" },
      { status: 500 }
    );
  }

  const fullUserData = {
    id: user.id,
    email: user.email,
    nickname: userData?.nickname,
    address: userData?.address,
  };

  return NextResponse.json(fullUserData);
}
