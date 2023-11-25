import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import axios from "axios";
import $ from 'jquery';
import 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-responsive-dt/js/responsive.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';



import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const ListRecette = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isUser,username } = useAuth();
    const [data, setData] = useState([])
    const api = "http:localhost:9090"
    const token = localStorage.getItem("token");

    const [open, setOpen] = React.useState(false);
    const [nom, setNom] = useState("")
    const [duree, setDuree] = useState("")
    const [ingredient, setIngredient] = useState([])
    const [etape, setEtape] = useState([])
    const handleOpen = (id) => {
        const elementTrouve = data.find((element) => element.id === id);
        if (elementTrouve){
            setNom(elementTrouve.nom)
            setDuree(elementTrouve.duree)
            setIngredient(elementTrouve.ingredients)
            setEtape(elementTrouve.etapes)
            console.log(elementTrouve)
        }
        else {
            console.log("error")
        }
        setOpen(true);
    }
    const handleClose = () => setOpen(false);


    useEffect(() => {
        if (data.length > 0) {
            const table = $('#myTable').DataTable();
            return () => {
                table.destroy();
            };
        }
    }, [data]);

    useEffect(() => {
        axios.get("http://localhost:9090/api/recette/all/admin123",{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
            .then(response =>{
                console.log(response.data)
                setData(response.data)
            }).catch(error =>{
            console.log(error)
        })
    }, []);

    if (isAuthenticated && isUser){
        return (
            <>
            <div>
                <h2>List recette</h2>

                <table className="table table-responsive" id="myTable">
                    <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Nom</th>
                        <th>Duree</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td> <img src="https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/elle-a-table/les-dossiers-de-la-redaction/dossier-de-la-redac/recettes-octobre/97376681-1-fre-FR/Des-recettes-a-faire-en-octobre-pour-accueillir-l-automne.jpg" width="50px" height="50px" alt={`Image ${index}`} />
                            </td>
                            <td>{item.nom}</td>
                            <td>{item.duree}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => window.confirm("Are you sure ?")}>
                                    Delete
                                </button>
                                <button className="btn btn-primary" onClick={() =>{handleOpen(item.id)}}>View</button>
                                <button className="btn btn-secondary">Edit</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Description de Recette
                            </Typography>
                            <hr/>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Nom:{" "+nom }<br/>
                                Duree : {" "+ duree}
                            </Typography>
                            <hr/>
                            les ingredients: <br/>
                            {ingredient.map((i,index) =>(
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {i.nom}
                                </Typography>
                            ))}
                            <hr/>
                            les etapes: <br/>
                            {etape.map((i,index) =>(
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {i.nom}
                                </Typography>
                            ))}
                        </Box>
                    </Modal>
                </div>
            </>

        );
    }
    else {
        return (
            <div>
                <button onClick={() =>{navigate("/login")}}> login</button>
            </div>
        )
    }

}

export default ListRecette;