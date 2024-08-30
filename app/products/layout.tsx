import React from "react";

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

function layout({ children, modal }: Props) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}

export default layout;
