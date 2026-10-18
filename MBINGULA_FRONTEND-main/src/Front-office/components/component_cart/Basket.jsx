import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logoImg from '../../assets/logo.png';
import carimboImg from '../../assets/carimbo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Basket(props) {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const totalPrice = itemsPrice;

  const basketRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tipoConsumo: '',
    valorTotal: totalPrice,
    itemsPedido: '',
    metodoPagamento: '',
    numeroMesa: '',
    userName: '',
    userPhone: ''
  });

  const [mesas, setMesas] = useState([]);
  const [isFromHome, setIsFromHome] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const { tipoConsumo, numeroMesa, userName, userPhone, metodoPagamento } = formData;
    if (
      tipoConsumo !== '' &&
      numeroMesa !== '' &&
      userName !== '' &&
      userPhone !== '' &&
      metodoPagamento !== ''
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getAllMesas');
        setMesas(response.data);
      } catch (error) {
        console.error('Erro ao buscar mesas:', error);
      }
    };
    fetchMesas();
  }, []);

  useEffect(() => {
    if (isFromHome) {
      setFormData((prevData) => ({
        ...prevData,
        tipoConsumo: 'para levar',
        numeroMesa: '41',
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        numeroMesa: '',
      }));
    }
  }, [isFromHome]);

  const handleDownloadPDF = () => {
    const input = basketRef.current;
  
    const buttons = input.querySelectorAll('.remove, .add');
    buttons.forEach(button => {
      button.style.display = 'none';
    });
  
    const pdf = new jsPDF();
  
    const getBase64Image = (imgUrl) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = reject;
        img.src = imgUrl;
      });
    };
  
    Promise.all([getBase64Image(logoImg), getBase64Image(carimboImg)])
      .then(([logoData, carimboData]) => {
        const logoWidth = 100;
        const logoHeight = 18;
        pdf.addImage(logoData, 'PNG', 6, 7, logoWidth, logoHeight);
  
        const carimboWidth = 90;
        const carimboHeight = 30;
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const x = (pdfWidth - carimboWidth) / 2;
        const y = (pdfHeight - carimboHeight) / 1.7;
        pdf.addImage(carimboData, 'PNG', x, y, carimboWidth, carimboHeight);
  
        html2canvas(input)
          .then((canvas) => {
            buttons.forEach(button => {
              button.style.display = 'inline-block';
            });
  
            const contentImgData = canvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(contentImgData);
            const contentWidth = pdf.internal.pageSize.getWidth() / 1.7;
            const contentHeight = (imgProps.height * contentWidth) / imgProps.width;
            const contentX = (pdf.internal.pageSize.getWidth() - contentWidth) / 7;
            const contentY = (pdf.internal.pageSize.getHeight() - contentHeight) / 8;
            pdf.addImage(contentImgData, 'PNG', contentX, contentY, contentWidth, contentHeight);
  
            const now = new Date();
            const dateTimeString = now.toLocaleString();
            pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(10);
            pdf.text(dateTimeString, pdf.internal.pageSize.getWidth() - 60, pdf.internal.pageSize.getHeight() - 10);
  
            const offsetY = 10;
            pdf.setFontSize(12);
            pdf.text(`Nome: ${formData.userName}`, 10, pdf.internal.pageSize.getHeight() - 10 - offsetY);
            pdf.text(`Telefone: ${formData.userPhone}`, 10, pdf.internal.pageSize.getHeight() - 10 - (offsetY * 2));
            pdf.text(`Método de Pagamento: ${formData.metodoPagamento}`, 10, pdf.internal.pageSize.getHeight() - 10 - (offsetY * 3));
  
            pdf.save('Restaurante_Mbingula_pedido.pdf');
            navigate('/Front-office/pages/Pedido');
          });
      })
      .catch(error => {
        console.error('Erro ao carregar as imagens:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedItemsPedido = cartItems.map(item => `${item.qty} x ${item.name}`).join(', ');

    const payload = {
      ...formData,
      itemsPedido: updatedItemsPedido,
      valorTotal: totalPrice,
      numeroMesa: parseInt(formData.numeroMesa, 10),
    };

    try {
      const response = await axios.post('http://localhost:3000/create-pedidoLocal', payload);
      if (response.status === 200) {
        alert('Pedido enviado com sucesso!');
      } else {
        alert('Erro ao enviar o pedido.');
      }
    } catch (error) {
      alert('Erro ao enviar o pedido.');
    }
  };

  return (
    <aside className="block col-2">
      <div style={{ marginBottom: '10px' }}>
        <h1 style={{ color: '#f0c038' }}>Restaurante Mbingula</h1>
      </div>
      <div ref={basketRef} id="basket-content">
        {cartItems.length === 0 && <div>Nenhum produto adicionado</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="col-2">{item.name}</div>
            <div className="col-2">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{' '}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>
            <div className="col-2 text-right">
              {item.qty} x {item.price.toFixed(2)}Kz
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr />
            <div className="row">
              <div className="col-2">
                <strong>Preço Total</strong>
              </div>
              <div className="col-1 text-right">
                <strong>{totalPrice.toFixed(2)}Kz</strong>
              </div>
            </div>
            <hr />
          </>
        )}
      </div>

      {cartItems.length !== 0 && (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Tipo de Consumo:
                <select 
                  name="tipoConsumo" 
                  value={formData.tipoConsumo} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Selecione um tipo</option>
                  <option value="para levar">Para levar</option>
                  <option value="para consumir">Para consumir</option>
                </select>
              </label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <label>
                Número da Mesa:
                <select 
                  name="numeroMesa" 
                  value={formData.numeroMesa} 
                  onChange={handleChange} 
                  required 
                  disabled={isFromHome}
                >
                  <option value="41">A partir de casa</option>
                  {mesas
                    .filter((mesa) => mesa.numero !== 41)
                    .map((mesa) => (
                      <option key={mesa.id} value={mesa.numero}>
                        {mesa.numero}
                      </option>
                    ))}
                </select>
              </label>

              <label style={{ marginLeft: '15px', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  checked={isFromHome}
                  onChange={() => setIsFromHome(!isFromHome)}
                />{' '}
                A partir de casa
              </label>
            </div>

            <div>
              <label>
                Nome:
                <input 
                  type="text" 
                  name="userName" 
                  value={formData.userName} 
                  onChange={handleChange} 
                  required 
                />
              </label>
            </div>

            <div>
              <label>
                Telefone:
                <input 
                  type="tel" 
                  name="userPhone" 
                  value={formData.userPhone} 
                  onChange={handleChange} 
                  required 
                />
              </label>
            </div>

            <div>
              <label>
                Método de Pagamento:
                <select 
                  name="metodoPagamento" 
                  value={formData.metodoPagamento} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Selecione um método</option>
                  <option value="pagamento à vista">Pagamento à vista</option>
                  <option value="pagamento com o cartão">Pagamento com o cartão</option>
                </select>
              </label>
            </div>

            <div>
              <button 
                type="submit" 
                onClick={handleDownloadPDF} 
                className="enviarPedido"
                style={{ marginTop: '20px' }}
                disabled={!isFormValid}
              >
                Enviar Pedido
              </button>
            </div>
          </form>
        </>
      )}
    </aside>
  );
}
