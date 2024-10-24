import { useDispatch, useSelector } from "react-redux";
import { formatNumber, manualProfitLoss } from "../../../helpers";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { profitLossDataForMatchConstants } from "../../../utils/constants";
import { isMobile } from "../../../utils/screenDimension";
import "./style.scss";

const ManualMarket = ({ title, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    index: any
  ) => {
    if (data?.activeStatus != "live" || status != "active") {
      return false;
    }
    if (odds === 0 || odds <0) {
      return false;
    }
    if(!detail?.rateThan100 && odds >100){
      return false;
    }
    let team = {
      betOnTeam: betTeam,
      rate: odds,
      type: type,
      stake: 0,
      teamA: data?.type?.includes("quickbookmaker") ? detail?.teamA : "Yes",
      teamB: data?.type?.includes("quickbookmaker") ? detail?.teamB : "No",
      teamC: data?.type?.includes("quickbookmaker") ? detail?.teamC : "",
      betId: data?.id,
      eventType: detail?.matchType,
      matchId: detail?.id,
      matchBetType: data?.type,
      placeIndex: index,
      gameType: detail?.matchType === "cricket" ? "cricket" : "other",
      min:data?.minBet ,
      max:data?.maxBet ,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  return (
    <>
      <div
        className="manualContainer"
        style={{ marginTop: isMobile ? "" : "10px" }}
      >
        <div className="manualTitle">
          <span
            className={`manualTitleTxt ${isMobile ? "f-size13" : "f-size15"}`}
          >
            {title}
          </span>
        </div>

        <div className="manualBackLayTab">
          <div className="manualMinMaxBox">
            <span className="manualMinMax">
            {data?.minBet===data?.maxBet? `Max:${formatNumber(data?.maxBet)}` :`Min:${formatNumber(data?.minBet)} Max:${formatNumber(data?.maxBet)}`}
            </span>
          </div>
          <div
            className={`manualBackLayBoxContainer ${
              isMobile ? "backLayBoxWidth" : "backLayBoxWidth"
            }`}
            // style={{ width: isMobile ? "40%" : isLap ? "240px" : "320px" }}
          >
            <div
              className="manualBackBoxTab"
              // style={{ width: isMobile ? "50%" : "25%" }}
            >
              <span className={`f-size16 manualBackTxt`}>Back</span>
            </div>
            <div
              className="manualLayBoxTab"
              // style={{ width: isMobile ? "50%" : "25%" }}
            >
              <span className={`f-size16 manualBackTxt`}>Lay</span>
            </div>
             <div className="manualEmptyBox"></div>
          </div>
        </div>

        <div className="manualTeamTab">
          {/* {data?.activeStatus != "live" && (
            <div className="suspended-overlayRatesmanual">
              <span
                className={`${
                  !isMobile ? "f-size18" : "f-size16"
                } suspendedTxtmanual`}
              ></span>
            </div>
          )} */}
          <div className="manualTeam" style={isMobile ? { width: "28%" } : {}}>
            <span className={`teamFont manualTeamTxt`}>
              {(data?.type?.includes("quickbookmaker")
                ? detail?.teamA
                : "Yes") > 25
                ? `${(data?.type?.includes("quickbookmaker")
                    ? detail?.teamA
                    : "Yes"
                  )?.slice(0, 25)}...`
                : data?.type?.includes("quickbookmaker")
                ? detail?.teamA
                : "Yes"}
            </span>
            <div className="d-flex flex-row justify-content-between w-100">
              <span
                className={`${
                  parseFloat(
                    detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.A +
                        "_" +
                        detail?.id
                    ]
                  ) +
                    manualProfitLoss(
                      selectedBet,
                      data?.type?.includes("quickbookmaker")
                        ? detail?.teamA
                        : "Yes",
                      data?.type,
                      data?.gtype
                    ) >
                  0
                    ? "color-green"
                    : "color-red"
                } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
              >
                {detail?.profitLossDataMatch?.[
                  profitLossDataForMatchConstants[data?.type]?.A +
                    "_" +
                    detail?.id
                ]
                  ? detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.A +
                        "_" +
                        detail?.id
                    ] === "0"
                    ? ""
                    : parseFloat(
                        detail?.profitLossDataMatch?.[
                          profitLossDataForMatchConstants[data?.type]?.A +
                            "_" +
                            detail?.id
                        ]
                      ) +
                      manualProfitLoss(
                        selectedBet,
                        data?.type?.includes("quickbookmaker")
                          ? detail?.teamA
                          : "Yes",
                        data?.type,
                        data?.gtype
                      )
                  : ""}
              </span>
              <span
                className="title-12 f-400"
                style={{
                  color:
                    manualProfitLoss(
                      selectedBet,
                      data?.type?.includes("quickbookmaker")
                        ? detail?.teamA
                        : "Yes",
                      data?.type,
                      data?.gtype
                    ) > 0
                      ? "#086f3f"
                      : "#bd1828",
                }}
              >
                {manualProfitLoss(
                  selectedBet,
                  data?.type?.includes("quickbookmaker")
                    ? detail?.teamA
                    : "Yes",
                  data?.type,
                  data?.gtype
                ) === 0
                  ? ""
                  : manualProfitLoss(
                      selectedBet,
                      data?.type?.includes("quickbookmaker")
                        ? detail?.teamA
                        : "Yes",
                      data?.type,
                      data?.gtype
                    )?.toFixed(2)}
              </span>
            </div>
          </div>
          <div
            className={`manualRateBox ${
              isMobile ? "rateBoxWidth" : "rateBoxWidth"
            }`}
            // style={{ width: isMobile ? "40%" : isLap ? "360px" : "480px" }}
          >
            {data?.statusTeamA != "active" && (
              <div className="suspended-overlayRatesmanual">
                <span className={`suspendTextCmmn`}>
                  {data?.statusTeamA?.toUpperCase()}
                </span>
              </div>
            )}
            {/* {!isMobile && ( */}
              <div
                className="manualBackBox back3Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.backTeamA - 2,
                    "BACK",
                    data?.type?.includes("quickbookmaker")
                      ? detail?.teamA
                      : "Yes",
                    data?.statusTeamA,
                    2
                  )
                }
              >
                <span className={`rateFont manualRate1Box`}>
                  {data?.backTeamA != 0 ? data?.backTeamA - 2 >0 ? data?.backTeamA - 2:"-" : "-"}
                </span>
              </div>
            
            {/* {!isMobile && ( */}
              <div
                className="manualBackBox back2Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.backTeamA - 1,
                    "BACK",
                    data?.type?.includes("quickbookmaker")
                      ? detail?.teamA
                      : "Yes",
                    data?.statusTeamA,
                    1
                  )
                }
              >
                <span className={`rateFont manualRate1Box`}>
                  {data?.backTeamA != 0 ?data?.backTeamA - 1 >0 ? data?.backTeamA - 1:"-" : "-"}
                </span>
              </div>
            
            <div
              className="manualBackBox back1Background"
              onClick={() =>
                handlePlaceBet(
                  data?.backTeamA,
                  "BACK",
                  data?.type?.includes("quickbookmaker")
                    ? detail?.teamA
                    : "Yes",
                  data?.statusTeamA,
                  0
                )
              }
            >
              <span className={`rateFont manualRate1Box`}>
                {data?.backTeamA != 0 ? data?.backTeamA : "-"}
              </span>
            </div>
            <div
              className="manualBackBox lay1Background"
              onClick={() =>
                handlePlaceBet(
                  data?.layTeamA,
                  "LAY",
                  data?.type?.includes("quickbookmaker")
                    ? detail?.teamA
                    : "Yes",
                  data?.statusTeamA,
                  0
                )
              }
            >
              <span className={`rateFont manualRate1Box`}>
                {data?.layTeamA != 0 ? data?.layTeamA : "-"}
              </span>
            </div>
            {/* {!isMobile && ( */}
              <div
                className="manualBackBox lay2Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.layTeamA + 1,
                    "LAY",
                    data?.type?.includes("quickbookmaker")
                      ? detail?.teamA
                      : "Yes",
                    data?.statusTeamA,
                    1
                  )
                }
              >
                <span className={`rateFont manualRate1Box`}>
                  {data?.layTeamA != 0 ? detail?.rateThan100? data?.layTeamA + 1 : data?.layTeamA + 1>100?"-": data?.layTeamA + 1 : "-"}
                </span>
              </div>
           
            {/* {!isMobile && ( */}
              <div
                className="manualBackBox lay3Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.layTeamA + 2,
                    "LAY",
                    data?.type?.includes("quickbookmaker")
                      ? detail?.teamA
                      : "Yes",
                    data?.statusTeamA,
                    2
                  )
                }
              >
                <span className={`rateFont manualRate1Box`}>
                  {data?.layTeamA != 0 ? detail?.rateThan100? data?.layTeamA + 2 : data?.layTeamA + 2>100?"-": data?.layTeamA + 2 : "-"}
                </span>
              </div>
           
          </div>
        </div>

        <div className="manualTeamTab">
          {/* {data?.activeStatus != "live" && (
            <div className="suspended-overlayRatesmanual">
              <span
                className={`${
                  !isMobile ? "f-size18" : "f-size16"
                } suspendedTxtmanual`}
              ></span>
            </div>
          )} */}
          <div className="manualTeam" style={isMobile ? { width: "28%" } : {}}>
            <span className={`teamFont manualTeamTxt`}>
              {(data?.type?.includes("quickbookmaker") ? detail?.teamB : "No") >
              25
                ? `${(data?.type?.includes("quickbookmaker")
                    ? detail?.teamB
                    : "No"
                  )?.slice(0, 25)}...`
                : data?.type?.includes("quickbookmaker")
                ? detail?.teamB
                : "No"}
            </span>
            <div className="d-flex flex-row justify-content-between w-100">
              <span
                className={`${
                  parseFloat(
                    detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.B +
                        "_" +
                        detail?.id
                    ]
                  ) +
                    manualProfitLoss(
                      selectedBet,
                      data?.type?.includes("quickbookmaker")
                        ? detail?.teamB
                        : "No",
                      data?.type,
                      data?.gtype
                    ) >
                  0
                    ? "color-green"
                    : "color-red"
                } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
              >
                {detail?.profitLossDataMatch?.[
                  profitLossDataForMatchConstants[data?.type]?.B +
                    "_" +
                    detail?.id
                ]
                  ? detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.B +
                        "_" +
                        detail?.id
                    ] === "0"
                    ? ""
                    : parseFloat(
                        detail?.profitLossDataMatch?.[
                          profitLossDataForMatchConstants[data?.type]?.B +
                            "_" +
                            detail?.id
                        ]
                      ) +
                      manualProfitLoss(
                        selectedBet,
                        data?.type?.includes("quickbookmaker")
                          ? detail?.teamB
                          : "No",
                        data?.type,
                        data?.gtype
                      )
                  : ""}
              </span>
              <span
                className="title-12 f-400"
                style={{
                  color:
                    manualProfitLoss(
                      selectedBet,
                      data?.type?.includes("quickbookmaker")
                        ? detail?.teamB
                        : "No",
                      data?.type,
                      data?.gtype
                    ) > 0
                      ? "#086f3f"
                      : "#bd1828",
                }}
              >
                {manualProfitLoss(
                  selectedBet,
                  data?.type?.includes("quickbookmaker") ? detail?.teamB : "No",
                  data?.type,
                  data?.gtype
                ) === 0
                  ? ""
                  : manualProfitLoss(
                      selectedBet,
                      data?.type?.includes("quickbookmaker")
                        ? detail?.teamB
                        : "No",
                      data?.type,
                      data?.gtype
                    )?.toFixed(2)}
              </span>
            </div>
          </div>
          <div
            className={`manualRateBox ${
              isMobile ? "rateBoxWidth" : "rateBoxWidth"
            }`}
            // style={{ width: isMobile ? "40%" : isLap ? "360px" : "480px" }}
          >
            {data?.statusTeamB != "active" && (
              <div className="suspended-overlayRatesmanual">
                <span className={`suspendTextCmmn`}>
                  {data?.statusTeamB?.toUpperCase()}
                </span>
              </div>
            )}
            {/* {!isMobile && ( */}
              <div
                className="manualBackBox back3Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.backTeamB - 2,
                    "BACK",
                    data?.type?.includes("quickbookmaker")
                      ? detail?.teamB
                      : "No",
                    data?.statusTeamB,
                    2
                  )
                }
              >
                <span className={`rateFont manualRate1Box`}>
                  {data?.backTeamB != 0 ? data?.backTeamB - 2 >0 ? data?.backTeamB - 2:"-" : "-"}
                </span>
              </div>
            
             {/* {!isMobile && ( */}
              <div
                className="manualBackBox back2Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.backTeamB - 1,
                    "BACK",
                    data?.type?.includes("quickbookmaker")
                      ? detail?.teamB
                      : "No",
                    data?.statusTeamB,
                    1
                  )
                }
              >
                <span className={`rateFont manualRate1Box`}>
                  {data?.backTeamB != 0 ? data?.backTeamB - 1 >0 ? data?.backTeamB - 1:"-" : "-"}
                </span>
              </div>
            
            <div
              className="manualBackBox back1Background"
              onClick={() =>
                handlePlaceBet(
                  data?.backTeamB,
                  "BACK",
                  data?.type?.includes("quickbookmaker") ? detail?.teamB : "No",
                  data?.statusTeamB,
                  0
                )
              }
            >
              <span className={`rateFont manualRate1Box`}>
                {data?.backTeamB != 0 ? data?.backTeamB : "-"}
              </span>
            </div>
            <div
              className="manualBackBox lay1Background"
              onClick={() =>
                handlePlaceBet(
                  data?.layTeamB,
                  "LAY",
                  data?.type?.includes("quickbookmaker") ? detail?.teamB : "No",
                  data?.statusTeamB,
                  0
                )
              }
            >
              <span className={`rateFont manualRate1Box`}>
                {data?.layTeamB != 0 ? data?.layTeamB : "-"}
              </span>
            </div>
             {/* {!isMobile && ( */}
              <div
                className="manualBackBox lay2Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.layTeamB + 1,
                    "LAY",
                    data?.type?.includes("quickbookmaker")
                      ? detail?.teamB
                      : "No",
                    data?.statusTeamB,
                    1
                  )
                }
              >
                <span className={`rateFont manualRate1Box`}>
                  {data?.layTeamB != 0 ? detail?.rateThan100 ? data?.layTeamB + 1 : data?.layTeamB + 1>100?"-": data?.layTeamB + 1 : "-"}
                </span>
              </div>
            
             {/* {!isMobile && ( */}
              <div
                className="manualBackBox lay3Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.layTeamB + 2,
                    "LAY",
                    data?.type?.includes("quickbookmaker")
                      ? detail?.teamB
                      : "No",
                    data?.statusTeamB,
                    2
                  )
                }
              >
                <span className={`rateFont manualRate1Box`}>
                  {data?.layTeamB != 0 ? detail?.rateThan100 ? data?.layTeamB + 2 : data?.layTeamB + 2>100 ? "-" : data?.layTeamB + 2 : "-"}
                </span>
              </div>
            
          </div>
        </div>

        {data?.type?.includes("quickbookmaker") && detail?.teamC && (
          <div className="manualTeamTab">
            {/* {data?.activeStatus != "live" && (
              <div className="suspended-overlayRatesmanual">
                <span
                  className={`${
                    !isMobile ? "f-size18" : "f-size16"
                  } suspendedTxtmanual`}
                ></span>
              </div>
            )} */}
            <div
              className="manualTeam"
              style={isMobile ? { width: "28%" } : {}}
            >
              <span className={`teamFont manualTeamTxt`}>
                {detail?.teamC?.length > 25
                  ? `${detail?.teamC?.slice(0, 25)}...`
                  : detail?.teamC}
              </span>{" "}
              <div className="d-flex flex-row justify-content-between w-100">
                <span
                  className={`${
                    parseFloat(
                      detail?.profitLossDataMatch?.[
                        profitLossDataForMatchConstants[data?.type]?.C +
                          "_" +
                          detail?.id
                      ]
                    ) +
                      manualProfitLoss(
                        selectedBet,
                        detail?.teamC,
                        data?.type,
                        data?.gtype
                      ) >
                    0
                      ? "color-green"
                      : "color-red"
                  } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
                >
                  {detail?.profitLossDataMatch?.[
                    profitLossDataForMatchConstants[data?.type]?.C +
                      "_" +
                      detail?.id
                  ]
                    ? detail?.profitLossDataMatch?.[
                        profitLossDataForMatchConstants[data?.type]?.C +
                          "_" +
                          detail?.id
                      ] === "0"
                      ? ""
                      : parseFloat(
                          detail?.profitLossDataMatch?.[
                            profitLossDataForMatchConstants[data?.type]?.C +
                              "_" +
                              detail?.id
                          ]
                        ) +
                        manualProfitLoss(
                          selectedBet,
                          detail?.teamC,
                          data?.type,
                          data?.gtype
                        )
                    : ""}
                </span>
                <span
                  className="title-12 f-400"
                  style={{
                    color:
                      manualProfitLoss(
                        selectedBet,
                        detail?.teamC,
                        data?.type,
                        data?.gtype
                      ) > 0
                        ? "#086f3f"
                        : "#bd1828",
                  }}
                >
                  {manualProfitLoss(
                    selectedBet,
                    detail?.teamC,
                    data?.type,
                    data?.gtype
                  ) === 0
                    ? ""
                    : manualProfitLoss(
                        selectedBet,
                        detail?.teamC,
                        data?.type,
                        data?.gtype
                      )?.toFixed(2)}
                </span>
              </div>
            </div>
            <div
              className={`manualRateBox ${
                isMobile ? "rateBoxWidth" : "rateBoxWidth"
              }`}
              // style={{ width: isMobile ? "40%" : isLap ? "360px" : "480px" }}
            >
              {data?.statusTeamC != "active" && (
                <div className="suspended-overlayRatesmanual">
                  <span className={`suspendTextCmmn`}>
                    {data?.statusTeamC?.toUpperCase()}
                  </span>
                </div>
              )}
              {/* {!isMobile && ( */}
                <div
                  className="manualBackBox back3Background"
                  onClick={() =>
                    handlePlaceBet(
                      data?.backTeamC - 2,
                      "BACK",
                      detail?.teamC,
                      data?.statusTeamC,
                      2
                    )
                  }
                >
                  <span className={`rateFont manualRate1Box`}>
                    {data?.backTeamC != 0 ? data?.backTeamC - 2 >0 ? data?.backTeamC - 2:"-" : "-"}
                  </span>
                </div>
              
              {/* {!isMobile && ( */}
                <div
                  className="manualBackBox back2Background"
                  onClick={() =>
                    handlePlaceBet(
                      data?.backTeamC - 1,
                      "BACK",
                      detail?.teamC,
                      data?.statusTeamC,
                      1
                    )
                  }
                >
                  <span className={`rateFont manualRate1Box`}>
                    {data?.backTeamC != 0 ? data?.backTeamC - 1 >0 ? data?.backTeamC - 1:"-" : "-"}
                  </span>
                </div>
              
              <div
                className="manualBackBox back1Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.backTeamC,
                    "BACK",
                    detail?.teamC,
                    data?.statusTeamC,
                    0
                  )
                }
              >
                <span className={`rateFont manualRate1Box`}>
                  {data?.backTeamC != 0 ? data?.backTeamC : "-"}
                </span>
              </div>
              <div
                className="manualBackBox lay1Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.layTeamC,
                    "LAY",
                    detail?.teamC,
                    data?.statusTeamC,
                    0
                  )
                }
              >
                <span className={`rateFont manualRate1Box`}>
                  {data?.layTeamC != 0 ? data?.layTeamC : "-"}
                </span>
              </div>
              {/* {!isMobile && ( */}
                <div
                  className="manualBackBox lay2Background"
                  onClick={() =>
                    handlePlaceBet(
                      data?.layTeamC + 1,
                      "LAY",
                      detail?.teamC,
                      data?.statusTeamC,
                      1
                    )
                  }
                >
                  <span className={`rateFont manualRate1Box`}>
                    {data?.layTeamC != 0 ? detail?.rateThan100 ? data?.layTeamC + 1 : data?.layTeamC + 1>100?"-": data?.layTeamC + 1 : "-"}
                  </span>
                </div>
              
              {/* {!isMobile && ( */}
                <div
                  className="manualBackBox lay3Background"
                  onClick={() =>
                    handlePlaceBet(
                      data?.layTeamC + 2,
                      "LAY",
                      detail?.teamC,
                      data?.statusTeamC,
                      2
                    )
                  }
                >
                  <span className={`rateFont manualRate1Box`}>
                    {data?.layTeamC != 0 ? detail?.rateThan100 ? data?.layTeamC + 2 : data?.layTeamC + 2 > 100 ? "-" : data?.layTeamC + 2 : "-"}
                  </span>
                </div>
              
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ManualMarket;
