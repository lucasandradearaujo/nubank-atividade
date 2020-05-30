import React from "react";
import {
  Container,
  Code,
  Nav,
  NavItem,
  NavText,
  SignOutButton,
  SignOutButtonText,
} from "./styles";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import QRCore from "react-native-qrcode-svg";

export default function Menu({ translateY }) {
  return (
    <Container
      style={{
        opacity: translateY.interpolate({
          inputRange: [0, 200],
          outputRange: [0, 1],
        }),
      }}
    >
      <Code>
        <QRCore
          color={"#FFF"}
          backgroundColor={"#8B10AE"}
          size={100}
          value={"https://app.nubank.com.br/"}
        />
      </Code>
      <Nav>
        <NavItem>
          <MaterialIcons name={"help-outline"} size={20} color={"#FFF"} />
          <NavText>Me ajuda</NavText>
        </NavItem>
        <NavItem>
          <MaterialIcons name={"person-outline"} size={20} color={"#FFF"} />
          <NavText>Perfil</NavText>
        </NavItem>
        <NavItem>
          <AntDesign name={"creditcard"} size={20} color={"#FFF"} />
          <NavText>Configurar cartão</NavText>
        </NavItem>
        <NavItem>
          <MaterialIcons name={"smartphone"} size={20} color={"#FFF"} />
          <NavText>Configurações do app</NavText>
        </NavItem>
      </Nav>
      <SignOutButton>
        <SignOutButtonText>sair do app</SignOutButtonText>
      </SignOutButton>
    </Container>
  );
}
