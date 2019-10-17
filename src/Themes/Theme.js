import { StyleSheet } from 'react-native'

export const ThemeResponsive = (val) => {
let Theme

    if (val <= 2) {
        return (
             Theme = StyleSheet.create({
                regular: {
                    color:"#fff",
                    fontSize: 12
                },
                header:{
                    fontSize:18,
                    color: "#fff",
                    fontWeight:"bold"
                }
            }) 
            )
    }

    // iPhone 6 Plus, 7 Plus, 8 Plus iPhone X, XS, XS Max Pixel, Pixel 2 xxhdpi Android devices
    else if (val <= 3) {
        return (
            Theme = StyleSheet.create({
                regular: {
                    color: "#fff",
                    fontSize: 12
                }
                ,
                header: {
                    fontSize: 18,
                    color: "#fff",
                    fontWeight: "bold"
                }
            })
        )
    }
    // Nexus 6 Pixel XL, Pixel 2 XL xxxhdpi Android devices
    else if (val <= 3.5) {
        return (
            Theme = StyleSheet.create({
                regular: {
                    color: "#fff",
                    fontSize: 13
                }
                ,
                header: {
                    fontSize: 20,
                    color: "#fff",
                    fontWeight: "bold"
                }
            })
        )
    }
}

