"use client";

import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import DaumPostcode from "react-daum-postcode";

interface AddressData {
  zonecode: string;
  address: string;
  extraAddress: string;
}

interface AddressSearchProps {
  onComplete: (data: AddressData) => void;
}

const AddressSearch = ({ onComplete }: AddressSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    onComplete({
      zonecode: data.zonecode,
      address: fullAddress,
      extraAddress: extraAddress,
    });

    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant={"outline"}
        width={"full"}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        주소
      </Button>

      {isOpen && (
        <div
          ref={modalRef}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-5 rounded-lg shadow-md"
        >
          <DaumPostcode
            onComplete={handleComplete}
            autoClose={false}
            style={{ width: "400px", height: "470px" }}
          />
        </div>
      )}
    </>
  );
};

export default AddressSearch;
