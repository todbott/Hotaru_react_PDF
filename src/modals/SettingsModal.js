import React, { useState } from "react";
import { Button, ButtonGroup, Col, Container, Form, Modal, Row } from 'react-bootstrap';



function SettingsModal(props) {

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onClose={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>設定</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row style={{ marginBottom: 25}}>
                <Col className="d-grid gap-2">    
                  <Form.Label>暗号コードを入力してください</Form.Label>
                 
                  <Form.Control type="text" onChange={(e) => props.onChangeValue('apiKey:'+e.target.value)} />
                </Col>
              </Row>
              <Row style={{ marginBottom: 25}}>
                <Col className="d-grid gap-2">    
                  <Form.Label>PDF言語を選んでくください</Form.Label>
                  <select onChange={(e) => {
                      props.onChangeValue('sourceCode:'+e.target.value)
                    }}>
                        <option value="en">英語</option>
                        <option value="fr">フランス語</option>
                        <option value="es">スペイン語</option>
                        <option value="ja">日本語</option>
                        <option value="zh">繁体字</option>
                        <option value="zh">簡体字</option>
                        <option value="ko">韓国語</option>
                        <option value="pt">ポルトガル語</option>
                        <option value="el">ギリシャ</option>
                        <option value="nl">オランダ語</option>
                        <option value="de">ドイツ語</option>
                        <option value="ru">ロシア語</option>
                        <option value="it">イタリア語</option>
                        <option value="pl">ポーランド語</option>
                        <option value="tr">トルコ語</option>
                    </select>
                    </Col>
                  </Row>
    
                  <Row style={{ marginBottom: 25}}>
                    <Col className="d-grid gap-2">    
                      <Form.Label>PDF 2 言語をえらんでください</Form.Label>
                      <select onChange={(e) => {
                          props.onChangeValue('targetCode:'+e.target.value)
                        }}>
                            <option value="en">英語</option>
                            <option value="fr">フランス語</option>
                            <option value="es">スペイン語</option>
                            <option value="ja">日本語</option>
                            <option value="zh">繁体字</option>
                            <option value="zh">簡体字</option>
                            <option value="ko">韓国語</option>
                            <option value="pt">ポルトガル語</option>
                            <option value="el">ギリシャ</option>
                            <option value="nl">オランダ語</option>
                            <option value="de">ドイツ語</option>
                            <option value="ru">ロシア語</option>
                            <option value="it">イタリア語</option>
                            <option value="pl">ポーランド語</option>
                            <option value="tr">トルコ語</option>
                        </select>  
                      </Col>
                    </Row> 
                    <Row>
                    <Col className="d-grid gap-2">    
                      <Form.Label>表示したい言語をえらんでください</Form.Label>
                      <select onChange={(e) => {
                          props.onChangeValue('displayCode:'+e.target.value)
                        }}>
                            <option value="ja">日本語</option>
                        </select>  
                      </Col>
                    </Row> 
                </Modal.Body>
            <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
            進む
        </Button>
        </Modal.Footer>
        </Modal>
        )
}
export default SettingsModal;