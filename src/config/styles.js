import { StyleSheet } from 'react-native'; 


export const styles = StyleSheet.create({ 
    container: { flex: 1,
         justifyContent: 'center',
          alignItems: 'center',
           padding: 20,
         },
         
    input: { 
        height: 60,
         borderColor: 'gray',
         borderWidth: 1,
         marginBottom: 12,
         paddingHorizontal: 8, 
         width: 400, 

         
        }, 
        
        button: {
             marginTop: 12, 
             marginBottom: 10,
             fontSize: 200,
             borderColor: "lightgray",
             borderWidth: 4,
             width: 200,
             backgroundColor: "lightgray",

            },

         error: { color: 'red'}, 

         image: {
            width: 500,
            height: 320,
            marginBottom: 30,
            borderRadius: 800,
         },

         titulo: {
            fontSize: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
         }
         
         
        });