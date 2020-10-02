import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, Image,Button } from 'react-native';
import { AppLoading } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import axios from "axios"
import Header from '../shared/header';
import Footer from '../shared/footer';
import { RUTA_API } from '../shared/constants';
import { FlingGestureHandler } from 'react-native-gesture-handler';

export default function Product({navigation, route, ngrok}) {
	const vino = require('../assets/botella.png')
	let [fontsLoaded] = useFonts({
	  Montserrat_400Regular,
	  Montserrat_700Bold,
	});
	const [quantity, setquantity] = useState({
		quantity: 1
	 })
	const[product, setProduct]=useState({
		title: "",
		pic:"",
		stock: "",
		price:"",
		description:"",
		ml:"",
		alcPct:"",
		rating: "",
		category: "",

	})
	useEffect(() => {
		 const rg = async()=>{
		 const response = await axios.get(`${RUTA_API}/api/product/getProduct/${route.params.id}`)
		 const info = response.data.productFound
		 console.log(info)
		setProduct({
			title: info.title,
			pic:info.pic,
			stock: info.stock,
			price:info.price,
			description:info.description,
			ml:info.ml,
			alcPct:info.alcPct,
			rating: info.rating,
			category: info.category,

		})
		}
		rg()
	}, [])
	const restar = () => {
        if (quantity.quantity > 1){
            setquantity({
                quantity: quantity.quantity - 1
            })

        }
    }
    const sumar = () => {
		if(quantity.quantity < product.stock) {
            setquantity({
                quantity: quantity.quantity + 1
            })
		}
	}
    if (!fontsLoaded) {
		return <AppLoading />;
	} 
	else {
		return (<>
		<View style={styles.header}>
			<Header nav={navigation} />
		</View>
		<View style={styles.container}>
		<View style={styles.Classbanner}>
				<Image source={vino} style={styles.ClassbannerImage}/>
                <Text style={styles.title}>{product.category}</Text>
        </View>
		<ScrollView>
			<View style={styles.productViews}>
				<Image style={styles.TheImage} source={{uri:`${RUTA_API}/${route.params.id}.jpg`}}></Image>
				<Text style={styles.titleProduct}>{product.title}</Text>
				<View  style={styles.ratings}>
					<FontAwesome  name="star" size={24} color="#D1B653" />
					<FontAwesome  name="star" size={24} color="#D1B653" />
					<FontAwesome  name="star" size={24} color="#D1B653" />
					<FontAwesome name="star-half-empty" size={24} color="#D1B653" />
					<FontAwesome name="star-o" size={24} color="#D1B653" />
				</View>
				<Text style={styles.units}>{product.stock} unidades</Text>
				<Text style={styles.price}>$ {product.price}</Text>
				<View style={styles.quantities}>
					<View style={styles.sum}>
						<Text  onPress={restar} style={styles.plus}> -</Text>
						<Text style={styles.quantity}>{quantity.quantity}</Text>
						<Text  onPress={sumar} style={styles.plus}>+</Text>
					</View>
					<View style={styles.addToBag}>
						<Text  style={styles.addToBagText}>Añadir al carrito</Text>
						<FontAwesome name="cart-plus" size={40}  />
					</View>
				</View>
				<View style={styles.mesures}>
					<Text style={styles.mesure}>{product.ml} ml</Text>
					<Text style={styles.mesure}>{product.alcPct} alc</Text>
				</View>
			</View>	
		</ScrollView>
		</View>
		<Footer nav={navigation} />
		</>)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	},
	regular: {
		fontFamily: 'Montserrat_400Regular'
	},
	bold: {
		fontFamily: 'Montserrat_700Bold'
	},
	header:{
		backgroundColor: "#191919",
		height: 80,
		borderBottomColor: "#353535",
		borderBottomWidth: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	Classbanner:{
		backgroundColor: "#58482a",
		width: 420,
		display: "flex",
		paddingLeft:20,
		flexDirection: "row",
		alignItems: "center",
		overflow: "hidden",
		
	},
	ClassbannerImage:{
		height: 70,
		width:60,
	},
	title:{
		fontWeight: "bold",
		color:"#fff",
		fontSize: 25,
		marginLeft: 10,
	},
	productViews:{
		display:"flex",
		alignItems: "center",
	},
	TheImage:{
		marginTop:20,
		height: 180,
		width:130,
	},	
	titleProduct:{
		fontSize: 23,
		color:"#fff",
		fontWeight: "bold",
		width: 360,
		textAlign: "center",
	},
	ratings:{
		display:"flex",
		flexDirection: "row",
		marginTop: 10,
	},	
	units:{
		color: "#fff",
		fontStyle: "italic",
		marginTop: 10,
		fontSize:15,
	},	
	price:{
		fontWeight: "bold",
		marginTop: 10,
		color: "#fff",
		fontSize: 23,
	},
	mesures:{
		color: "white",
		display:"flex",
		flexDirection:"row",
		alignItems:"center",
		justifyContent: "space-between",
		width: 280,
		marginTop:20,
	},
	mesure:{
		fontWeight:"bold",
		color: "#fff",
	},
	sum:{
		display:"flex",
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"center",
		marginTop:20,

	},
	plus:{
		color: "white",
		paddingHorizontal: 15,
		paddingVertical: 7,
		borderWidth: 1,
		fontSize:25,
		borderColor: '#D1B653',
	},
	quantity:{
		color: "#fff",
		fontSize:20,
		paddingHorizontal: 15,
	},
	addToBag:{
		display:"flex",
		flexDirection: "row",
		alignItems:"center",
		paddingHorizontal: 20,
		paddingVertical: 7,
		marginTop:30,
		backgroundColor: '#D1B653',

	},
	addToBagText:{
      fontSize: 20,
	}
})