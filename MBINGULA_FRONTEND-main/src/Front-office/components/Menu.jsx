import { useRef, useState, useContext, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { RiRestaurant2Fill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import {
  AiFillSun,
  AiFillTool,
  AiOutlineContainer,
  AiOutlineEdit,
  AiOutlineMail,
  AiOutlineFileDone,
  AiOutlineQuestionCircle,
  AiOutlinePlusCircle,
  AiOutlineUser,
  AiOutlineReload
} from "react-icons/ai";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const navRef = useRef();
  const [showMore, setShowMore] = useState(false);
  const [showOrderMenu, setShowOrderMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNormal, setIsNormal] = useState(false);
  const { signed, signOut } = useContext(AuthContext);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const handleShowMore = () => {
    setShowMore(true);
    setShowOrderMenu(false);
  };

  const handleBack = () => {
    setShowMore(false);
    setShowOrderMenu(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (signed) {
        try {
          const token = localStorage.getItem("@Auth:token");
          const response = await fetch("http://localhost:3000/getLoginUser", {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error('Erro ao buscar dados do usuário');
          }

          const data = await response.json();
          const accessName = data.userAccess[0]?.Access.name;

          setIsAdmin(accessName === "adm");
          setIsNormal(accessName === "normal");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [signed]);

  return (
    <header className="header">
      <Link to="/" className="logo">
        <RiRestaurant2Fill className="fa-cutlery" />
        Restaurante Mbingula
      </Link>

      <div className="navbar">
        <nav ref={navRef}>
          <ul>

            {!showMore && !showOrderMenu ? (
              <>
                <li><NavLink to="/"><IoHome className="icones-menu" /> Home</NavLink></li>
                {(isAdmin || isNormal) && (
                  <li><NavLink to="/Front-office/pages/Pedido"><AiOutlineMail className="icones-menu" /> Pedido</NavLink></li>
                )}
                {isAdmin && (
                  <li><NavLink to="/Back-office/App_BackOffice"><AiOutlineUser className="icones-menu" /> Admin</NavLink></li>
                )}
                {(isAdmin || isNormal) && (
                  <li><NavLink to="#" onClick={handleShowMore}><AiOutlinePlusCircle className="icones-menu" /> Ver mais</NavLink></li>
                )}
                <li>
                  {signed ? (
                    <NavLink style={{ color: 'red' }} to="/" onClick={() => {
                      signOut();
                      window.location.reload();
                    }}>
                      <BiLogOut style={{ color: 'red' }} className="icones-menu" /> Sair
                    </NavLink>
                  ) : (
                    <NavLink to="/Front-office/components/LoginRegisterForm"><BiLogIn className="icones-menu" /> Entrar</NavLink>
                  )}
                </li>
              </>
            ) : (
              <>
                <li><NavLink to="/Front-office/pages/AtividadeCasa"><AiFillSun className="icones-menu" /> Atividades</NavLink></li>
                <li><NavLink to="/Front-office/pages/CardapioItems"><AiOutlineContainer className="icones-menu" /> Cardápio </NavLink></li>
                <li><NavLink to="/Front-office/pages/Servicos"><AiFillTool className="icones-menu" /> Serviços</NavLink></li>
                <li><NavLink to="/Front-office/pages/pages/avaliacao/create"><AiOutlineEdit className="icones-menu" /> Avaliação</NavLink></li>
                <li><NavLink to="/Front-office/pages/mesaReservada"><AiOutlineFileDone className="icones-menu" /> Res. Mesa</NavLink></li>
                <li><NavLink to="/Front-office/pages/Sobre"><AiOutlineQuestionCircle className="icones-menu" /> Sobre</NavLink></li>
                <li><NavLink to="#" onClick={handleBack}><AiOutlineReload className="icones-menu" /> Voltar</NavLink></li>
              </>
            )}
            <button className="nav-btn nav-close-btn" onClick={showNavbar}>
              <FaTimes />
            </button>
          </ul>
        </nav>

        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
