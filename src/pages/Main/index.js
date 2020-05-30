import React from "react";
import {
  Container,
  Content,
  Annotation,
  Card,
  CardHeader,
  CardContent,
  Title,
  Description,
  CardFooter,
} from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/Header";
import Tabs from "../../components/Tabs";
import Menu from "../../components/Menu";
import { Animated } from "react-native";
import {
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";

export default function Main() {
  let offset = 0;
  const translateY = new Animated.Value(0);
  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { y } = event.nativeEvent;
      const translatey = event.nativeEvent.translationY;

      offset += translatey;

      translateY.setOffset(offset)
      translateY.setValue(0);

      if (y >= 100) {
        opened = true;
      } else {
        translateY.setOffset(offset);
        translateY.setValue(0);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 320 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <Menu translateY={translateY} />
        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChanged}
        >
          <Card
            style={{
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [-350, 0, 380],
                    outputRange: [-50, 0, 380],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          >
            <CardHeader>
              <MaterialIcons name={"attach-money"} size={28} color={"#666"} />
              <MaterialIcons name={"visibility-off"} size={28} color={"#666"} />
            </CardHeader>
            <CardContent>
              <Title>Saldo disponivel</Title>
              <Description>R$ 1.000.000,00</Description>
            </CardContent>
            <CardFooter>
              <Annotation>
                Transferência de R$ 1,00 recebida de Lucas hoje às
                18:00h.
              </Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>
      </Content>
      <Tabs translateY={translateY} />
    </Container>
  );
}
