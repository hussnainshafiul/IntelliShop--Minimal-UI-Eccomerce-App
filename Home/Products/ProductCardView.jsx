import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import styles from "./ProductCardView.style";

import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const ProductCardView = ({ Title, price, image, Category, onPress }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.imagecontainer}>
          <Image style={styles.image} source={image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {Title}
          </Text>
          <Text style={styles.supplier}>{Category}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="add-circle" size={35} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;
