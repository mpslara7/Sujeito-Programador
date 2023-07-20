
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

export function ActiveLink ({ children, activeClassName, ...rest }: ActiveLinkProps){
  const { asPath } = useRouter(); // Ele representa a rota que estamos

  const className = asPath === rest.href ? activeClassName : '';
  // Se a rota que estamos a acessando for igual ao link que ele clicou ativamos o activeClassName

  return(
    <Link {...rest}>
      {cloneElement(children, { // Usamos cloneElement para clonar nosso elemento children e acrescentar a variavel className que contem nossa logica condicional para ativação do activeClassName
        className
      })}
    </Link>
  )
}
