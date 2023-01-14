import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { accountContext } from "../../context/account.context";
import FriendItem from "./FriendItem";
import MatchhistoryItem from "./MatchhistoryItem";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { me } from "../../interfaces/me.interface";
import {fetchAccountService} from "../../utils/fetchAccountService";
type History = {
  gameId: string,
  winnerid: string,
  loserid: string,
  Scorewin: number,
  Scorelose: number,
  playedat: string,
  winner: {
      username: string,
      avatar: string
  },
  loser: {
      username: string,
      avatar: string
  } 
}
function MatchHistory() {
  const [data, setData] = useState<History[]>([]);
  const [me, setME] = useState<me | undefined>(undefined);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  // const {getAccounts} = useContext(accountContext);
  const path = window.location.pathname.split("/").at(-1);
  useEffect(() => {
    const endPoint =
      path === "profile" ? "games/history" : `games/history/${path}`;
    const endie = path === "profile" ? "users/me" : `users/username/${path}`;

    fetchAccountService(`${endPoint}`)
      .then((res) => {
        console.log(">>>", res);
        setData(res);
      })
      .catch((err) => {});

    fetchAccountService(`${endie}`)
      .then((res) => {
        console.log(">>>", res);
        setME(res);
      })
      .catch((err) => {
        console.table(err);
      });
    console.log("executed inside matchhistory");
  }, [location]);

  // eslint-disable-next-line no-lone-blocks
  {
    return (
      <div className="flex flex-col justify-center h-full">
        <div className="w-full mx-auto bg-[#2c2f489c] shadow-lg rounded-sm ">
          <header className="px-5 py-4 d-flex justify-content-between align-items-center">
            <h2 className="font-semibold text-black">History</h2>
            <Button variant="secondary" onClick={() => setExpanded(!expanded)}>
              {expanded ? "Show Less" : "Show More"}
            </Button>
          </header>
          <div className="p-3 bg-[#a78bfa]  ">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-black ">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">oppenent</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">score</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Date</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Mode</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {/* Child component: Row */}
                  {data.map((game, index) => {
                    const hist = {
                      opid:
                        game.winner.username === me?.username
                          ? game.loser.username
                          : game.winner.username,
                      avatar:
                        game.winner.username === me?.username
                          ? game.loser.avatar
                          : game.winner.avatar,
                      winnerscore: game.Scorewin,
                      loserscore: game.Scorelose,
                      time: new Date(game.playedat).toISOString().slice(0, 10), //.replace(/-/g,""),
                    };

                    if (!expanded) {
                      if (index < 5)
                        return <MatchhistoryItem key={index} {...hist} />;
                    } else return <MatchhistoryItem key={index} {...hist} />;
                  })}
                  {/* More Row components can go here */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchHistory;

const SButton = styled.button`
  align-items: center;
  background-color: initial;
  background-image: linear-gradient(
    rgba(179, 132, 201, 0.84),
    rgba(57, 31, 91, 0.84) 50%
  );
  border-radius: 42px;
  border-width: 0;
  box-shadow: rgba(57, 31, 91, 0.24) 0 2px 2px,
    rgba(179, 132, 201, 0.4) 0 8px 12px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  font-family: Quicksand, sans-serif;
  font-size: 18px;
  font-weight: 700;
  justify-content: center;
  letter-spacing: 0.04em;
  line-height: 16px;
  margin: 0;
  padding: 18px 18px;
  text-align: center;
  text-decoration: none;
  text-shadow: rgba(255, 255, 255, 0.4) 0 0 4px,
    rgba(255, 255, 255, 0.2) 0 0 12px, rgba(57, 31, 91, 0.6) 1px 1px 4px,
    rgba(57, 31, 91, 0.32) 4px 4px 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;

  &:hover {
    background-image: linear-gradient(#b384c9, #391f5b 50%);
    transform: translateY(-3px);
  }

  @media (min-width: 768px) {
    .button-72 {
      font-size: 21px;
      padding: 18px 34px;
    }
  }
`;
