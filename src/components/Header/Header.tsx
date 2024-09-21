import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  return (
    <header className="flex flex-col w-full">
      {/* 로고, 회원가입/로그인 */}
      <div className="flex items-center justify-between w-full px-3 py-4">
        <Link href={"/"}>
          <h1 className="text-32-semibold">종하마켓</h1>
        </Link>
        <div className="flex items-center gap-1">
          <Link href={"/signup"}>
            <span className="text-primary-100">회원가입</span>
          </Link>
          <div className="w-px h-4 bg-black-100" aria-hidden="true" />
          <Link href={"/login"}>
            <span>로그인</span>
          </Link>
        </div>
      </div>

      {/* 카테고리 */}
      <div className="flex items-center px-4 pb-4">
        <button className="text-16-medium flex items-center gap-1">
          <GiHamburgerMenu size={24} />
          <span>카테고리</span>
        </button>
      </div>

      {/* 구분자 */}
      <div className="w-full h-px bg-[#ccc]" />
    </header>
  );
};

export default Header;
