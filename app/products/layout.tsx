import React, { PropsWithChildren } from "react";

type Props = {
  modal: React.ReactNode;
};

function layout({ children, modal }: PropsWithChildren<Props>) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}

export default layout;
