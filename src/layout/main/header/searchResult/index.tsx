import "./style.scss";

const SearchResult = ({ data }: any) => {
  return (
    <div className="position-absolute top-100 z-3 bg-white text-black p-2 search-result">
      {data?.map((item: any, index: number) => (
        <div key={index} className="d-flex flex-column w-100 border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <div className="f700 title-16">{item?.name}22222222</div>
            <div className="title-14">{item?.date}</div>
          </div>
          <div className="title-14">{item?.label}</div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
