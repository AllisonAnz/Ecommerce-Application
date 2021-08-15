import React from "react"
//Create a Context Object
const Context = React.createContext({})
export default Context

//About Context 
//Youll need to declare a Context Provider for you context object 
//This allows a page/container component to subscribe to your context object for changes
//Any child component of the container will be able to access the context object user the useContext function 