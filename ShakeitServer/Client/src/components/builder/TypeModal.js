import react from 'react'
import { Modal, Button, Form } from 'react-bootstrap'


export const MyVerticallyCenteredModal= ({props, numIngredients, types, handleInputChange}) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="add-ingredient">
                                <Form.Control id={`${numIngredients > 4 ? "disabledSelect" : ""}`} as="select" onChange={handleInputChange} className="form-control" >
                                <option value="0">+ Add Ingredient</option>
                                {types.map(t => (
                                    <option key={t.id} value={t.id}>
                                        {t.name}
                                    </option>
                                ))}
                                </Form.Control>
                            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }