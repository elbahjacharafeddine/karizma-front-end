import React, { useEffect, useState } from "react";

export default function NotFound() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Mettez à jour l'état open pour afficher le modal directement au chargement de la page
        setOpen(true);
    }, []); // Le tableau vide indique que cet effet ne dépend d'aucune variable, il ne s'exécutera donc qu'une fois au montage.

    return (
        <div className={`modal fade${open ? " show" : ""}`} id="modalConfirmDelete" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!open}>
            <div className="modal-dialog modal-sm modal-notify modal-danger" role="document">
                <div className="modal-content text-center">
                    <div className="modal-header d-flex justify-content-center">
                        <p className="heading">Are you sure?</p>
                    </div>

                    <div className="modal-body">
                        <i className="fas fa-times fa-4x animated rotateIn"></i>
                    </div>

                    <div className="modal-footer flex-center">
                        <a href="" className="btn btn-outline-danger">
                            Yes
                        </a>
                        <a type="button" className="btn btn-danger waves-effect" data-dismiss="modal" onClick={() => setOpen(false)}>
                            No
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
