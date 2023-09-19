import Form from "../../Components/Form/Form.jsx";
import { Header } from "../../Components/Header/Header.jsx";
import '../Home/Home.css'

export const Home = () => {
    return (
        <div className="container">
            <Header /> 
            <Form />
        </div>
    )
}