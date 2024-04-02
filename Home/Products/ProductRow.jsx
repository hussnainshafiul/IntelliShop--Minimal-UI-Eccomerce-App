import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SIZES } from "../../constants";
import ProductCardView from "./ProductCardView";
import { getProduct, getProducts } from "../../model/data";
import { useNavigation } from "@react-navigation/native";

export default function ProductRow({ products }) {
  const navigation = useNavigation();

  function renderProduct({ item: product }) {
    return (
      <ProductCardView
        {...product}
        onPress={() =>
          navigation.navigate("ProductDetails", { productId: product.id })
        }
      />
    );
  }

  return (
    <View
      style={{
        marginTop: SIZES.medium - 6,
        marginHorizontal: SIZES.medium,
      }}
    >
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        contentContainerStyle={{ paddingHorizontal: SIZES.medium - 13 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
