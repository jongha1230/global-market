import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

interface SignUpFields {
  email: string;
  nickname: string;
  password: string;
  fullAddress: string;
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const body = await request.json();
  const fields: (keyof SignUpFields)[] = [
    "email",
    "nickname",
    "password",
    "fullAddress",
  ];
  const formFields: Partial<SignUpFields> = {};

  for (const field of fields) {
    const value = body[field];
    if (typeof value !== "string" || value.trim() === "") {
      return NextResponse.json(
        { error: `${field}를 입력해주세요.` },
        { status: 400 }
      );
    } else {
      formFields[field] = value.trim();
    }
  }

  // 필수 필드 확인
  if (
    !formFields.email ||
    !formFields.nickname ||
    !formFields.password ||
    !formFields.fullAddress
  ) {
    return NextResponse.json(
      { error: "필수 정보가 누락되었습니다." },
      { status: 400 }
    );
  }

  const { email, nickname, password, fullAddress } = formFields as SignUpFields;

  // 1. 사용자 가입
  const {
    data: { user },
    error: signUpError,
  } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    console.error("Sign up error:", signUpError);
    return NextResponse.json({ error: signUpError.message }, { status: 400 });
  }

  if (!user) {
    return NextResponse.json(
      { message: "Sign up process initiated, but no data returned" },
      { status: 200 }
    );
  }

  // 2. 사용자 정보를 users 테이블에 삽입
  const { data: userData, error: insertError } = await supabase
    .from("users")
    .insert({
      id: user.id,
      email: email,
      nickname: nickname,
      address: fullAddress,
    })
    .select()
    .single();

  if (insertError) {
    console.error("User data insertion error:", insertError);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json(userData);
}
