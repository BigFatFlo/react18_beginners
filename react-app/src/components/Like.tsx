import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";

interface Props {
  onClick: () => void;
}

const Like = ({ onClick }: Props) => {
  const [status, setStatus] = useState(false);

  const toggle = () => {
    setStatus(!status);
    onClick();
  };

  if (status) return <AiFillHeart color="#FF6BF1" size={20} onClick={toggle} />;
  else return <AiOutlineHeart color="#FF6BF1" size={20} onClick={toggle} />;
};

export default Like;
