import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create ({
  container: {
    width: 174,
    height: 240,
    marginEnd: SIZES.medium , // Use SIZES.medium instead of a specific value
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.lightWhite,
    marginTop: -10
  },
  imagecontainer: {
    flex:1,
    width: 174,
    marginLeft: SIZES.small/2 +2, 
    marginTop: SIZES.small/2+2,
    borderRadius: 50,
  },
  image: {
  resizeMode: "cover",
  width: "90%",
  height: '90%',
  alignItems: 'center', // Center horizontally
  justifyContent: 'center', // Center vertically
  borderRadius: 30,
  },
  details: {
   paddingTop: -50,
    padding: SIZES.small 
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large-2,
    marginBottom: 2
  },
  supplier: {
    fontFamily: "regular",
    fontSize: SIZES.small+ 3,
    color: COLORS.gray

  },
  price: {

    fontFamily: "bold",
    fontSize: SIZES.medium
  },
  btn: {
    position: 'absolute',
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
    
  }
})

export default styles;