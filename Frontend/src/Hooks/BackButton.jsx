import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

export default function BackButton ({ className = ""}) {
    const navigate = useNavigate();
    return (
      <>
        <Button
          onClick={() => navigate(-1)}
          className={`card-themed back-style ${className}`}>
          &larr; Back
        </Button>
      </>
    );
}