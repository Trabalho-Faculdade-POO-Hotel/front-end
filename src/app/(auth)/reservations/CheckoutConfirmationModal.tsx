import Button from "@/components/Button";
import { Fade, Modal } from "@mui/material";

interface CheckoutConfirmationModalProps {
    open: boolean;
    isLoading: boolean;
    onConfirm: () => void;
    onClose: () => void;
}
const CheckoutConfirmationModal = ({ open, onConfirm, isLoading, onClose }: CheckoutConfirmationModalProps) => {
    return (
        <Modal open={open} className="flex flex-col justify-center items-center">
            <Fade in={open}>
                <div className="bg-white bg-opacity-70 backdrop-blur-md p-5 rounded-md shadow-lg">
                    <p className="mb-8">Tem certeza que deseja realizar o check-out para esta reserva ?</p>
                    <div className="flex gap-3 justify-end mt-10">
                        <Button className="bg-red-500 hover:bg-red-700" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button onClick={onConfirm} loading={isLoading}>Confirmar</Button>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}

export default CheckoutConfirmationModal;
