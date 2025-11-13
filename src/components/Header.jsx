import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBars } from "@fortawesome/free-solid-svg-icons";
import xandre from './Xandre.jpg'
export default function Header (){
    return (
        <header>
            <section>
                <img src={xandre}/>
           <h2>CHEF XANDER</h2>
            </section>
            
           <p><FontAwesomeIcon icon={faBars}/></p>
        </header>
    )
}