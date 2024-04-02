import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../constants";
import { Colors } from "react-native/Libraries/NewAppScreen";
const Slider = () => {
  const slides = [
    { image: require("../assets/slide1.jpg") },
     { image: require("../assets/slider3.jpg") },
    { image: require("../assets/slide3.jpg") },
   
    //   {image: require("../../assets")}
  ];
  return (
    <View style={styles.carouselContainer}>
      <SliderBox
        images={slides.map((slide) => slide.image)}
        dotColor={COLORS.black}
        inactiveDotColor={COLORS.secondary}
        ImageComponentStyle={{
          borderRadius: 25,
          width: "87%",
          height:200,
        }}
        autoplay
        circleLoop
      />
    </View>
  );
};
const styles = StyleSheet.create({
  carouselContainer: {
    
  
    
  
  },
});

export default Slider;
