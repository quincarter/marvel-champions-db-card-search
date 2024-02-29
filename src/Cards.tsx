import { useState } from "react";
import "./Card.css";
import CARD_DATA from "./test-data/cards.json";

function Cards() {
  const [packSelect, setPackSelect] = useState("core");
  let [cardData, setCardData] = useState(CARD_DATA);
  let [filteredData, setFilteredData]: any = useState([]);
  const key = "pack_code";

  const packNames = [
    ...new Map(CARD_DATA.map((item) => [item[key], item])).values(),
  ];

  const packs = packNames
    .map((item) => ({
      pack_name: item.pack_name,
      pack_code: item.pack_code,
    }))
    .sort((a, b) => (a.pack_name < b.pack_name ? -1 : 0));

  if (packSelect === "all") {
    cardData = filteredData.length > 0 ? [...filteredData] : [...CARD_DATA];
  } else {
    cardData = cardData.filter((card) => card.pack_code === packSelect);
  }

  const packFilter = packs.map((pack) => (
    <option value={pack.pack_code}>{pack.pack_name}</option>
  ));
  const cards = cardData.map((card) => (
    <a href={card.url} target="_blank">
      <img
        className="card-image"
        src={
          "http://marvelcdb.com" +
          (!card.imagesrc ? resolveCardUrl(card.name) : card.imagesrc)
        }
        alt={card.name + " - " + card.code}
      />
    </a>
  ));

  function filterData(value: any): void {
    setCardData([
      ...CARD_DATA.filter((card) =>
        card.name.toLowerCase().includes(value.toLowerCase())
      ),
    ]);

    setFilteredData([
      ...CARD_DATA.filter((card) =>
        card.name.toLowerCase().includes(value.toLowerCase())
      ),
    ]);
  }

  return (
    <>
      <div className="container">
        <h1>
          {packSelect === "all"
            ? "Showing all Cards"
            : packs.filter((item) => item.pack_code === packSelect)[0]
                .pack_name}
        </h1>
        <div className="controls">
          <input
          placeholder="Search for the Name of a Card"
            type="search"
            onInput={(e: any) => filterData(e?.target?.value)}
          />
          <select
            defaultValue={"core"}
            onChange={(e) => setPackSelect(e.target.value)}
          >
            <option value="all">Show All (May Load Slowly)</option>
            {packFilter}
          </select>
        </div>

        <div className="card-container">{cards}</div>
      </div>
    </>
  );
}

export default Cards;

function resolveCardUrl(name: string) {
  const customName = name.toLowerCase();
  switch (customName) {
    case "avengers mansion":
      return "/bundles/cards/01091.png";
    case "strength":
      return "/bundles/cards/01090.png";
    case "genius":
      return "/bundles/cards/01089.png";
    case "energy":
      return "/bundles/cards/01088.png";
    case "med team":
      return "/bundles/cards/01080.png";
    case "the power of protection":
      return "/bundles/cards/01079.png";
    default:
      return "";
  }
}
