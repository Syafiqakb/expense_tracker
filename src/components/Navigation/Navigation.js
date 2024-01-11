import React, { useState } from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import { signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import { useGlobalContext } from '../../context/globalContext'
import { dollar } from '../../utils/Icons';


function Navigation({active, setActive}) {
    const {totalBalance} = useGlobalContext()
    return (
        <NavStyled>
            <div className="user-con">
                <img src={avatar} alt="" />
                <div className="text">
                    <h2>Mike</h2>
                    <p>{dollar} {totalBalance()}</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="bottom-nav">
                <li>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 300px;
    height: 100%;
    background: var(--color-accent);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: var(--primary-color);
            font-size: 1.5rem;
        }
        p{
            color: var(--primary-color2);
            font-size: 1rem;
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: var(--primary-color3);
            padding-left: 1rem;
            position: relative;
            i{
                color: var(--primary-color3);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: var(--primary-color) !important;
        i{
            color: var(--primary-color) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: var(--primary-color);
            border-radius: 0 10px 10px 0;
        }
    }
`;

export default Navigation