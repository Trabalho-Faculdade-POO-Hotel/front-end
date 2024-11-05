import Button from "@/components/Button";
import { Quarto } from "@/services/quarto/types";
import { Fade, Modal } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Moment } from "moment";
import { useCallback, useEffect, useState } from "react";

interface ConfirmationModalProps {
    open: boolean;
    selectedQuarto: Quarto | null;
    isLoading: boolean;
    onConfirm: (initialDate: Moment, finalDate: Moment) => void;
    onClose: () => void;
}
const ConfimationModal = ({ open, onConfirm, isLoading, selectedQuarto, onClose }: ConfirmationModalProps) => {
    const [initialDate, setInitialDate] = useState<Moment | null>(null);
    const [finalDate, setFinalDate] = useState<Moment | null>(null);
    const [initialDateError, setInitialDateError] = useState<string | null>(null);
    const [finalDateError, setFinalDateError] = useState<string | null>(null);

    const onConfirmCallback = useCallback(() => {
        setInitialDateError(null);
        setFinalDateError(null);

        if (!initialDate) {
            setInitialDateError("Data inicial é obrigatória");
        }
        if (!finalDate) {
            setFinalDateError("Data final é obrigatória");
        }
        if (!initialDate || !finalDate) {
            return;
        }

        onConfirm(initialDate, finalDate);
    }, [finalDate, initialDate, onConfirm]);

    useEffect(() => {
        if (!open) {
            setInitialDate(null);
            setFinalDate(null);
            setInitialDateError(null);
            setFinalDateError(null);
        }
    }, [open]);

    return (
        <Modal open={!!selectedQuarto} className="flex flex-col justify-center items-center">
            <Fade in={!!selectedQuarto}>
                <div>
                    <div className="bg-white bg-opacity-70 backdrop-blur-md p-5 rounded-md shadow-lg">
                        <p className="mb-8">Tem certeza que deseja reservar este quarto ?</p>
                        <div className="flex flex-col gap-3">
                            <DatePicker 
                                label="Data inicial" 
                                value={initialDate} 
                                onChange={setInitialDate}
                                slotProps={{
                                    textField: {
                                        error: !!initialDateError,
                                        helperText: initialDateError,
                                    },
                                }} 
                            />
                            <DatePicker 
                                label="Data final" 
                                value={finalDate} 
                                onChange={setFinalDate}
                                slotProps={{
                                    textField: {
                                        error: !!finalDateError,
                                        helperText: finalDateError,
                                    },
                                }} 
                            />
                        </div>
                        <div className="flex gap-3 justify-end mt-10">
                            <Button className="bg-red-500 hover:bg-red-700" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button onClick={onConfirmCallback} loading={isLoading}>Confirmar</Button>
                        </div>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}

export default ConfimationModal;
