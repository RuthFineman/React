import { useParams } from "react-router"

const Person=()=>{
const {id} =useParams();
return(<>

<h1>Person</h1>
<h3>{id}</h3>
</>)
}
export default Person

