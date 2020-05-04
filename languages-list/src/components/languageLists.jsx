import React, { Component } from "react";
import { fetchLanguages } from "../services/fetchLanguages";

import CardBox from "./cardBox";
import LoaderImage from "./common/loaderImage";
import Paginate from "./common/paginate";
import paginate from "../utils/paginate";
import SearchBar from "./common/searchBar";

class LanguageList extends Component {
  state = {
    lang: [],
    pageCount: 4,
    currentPage: 1,
  };

  async componentDidMount() {
    const { data: languages } = await fetchLanguages();
    this.setState({ lang: languages });
  }

  handlePageChange = (pageIndex) => {
    this.setState({ currentPage: pageIndex });
  };

  handleSearch = async ({ currentTarget: search }) => {
    console.log(search.value);

    const { lang } = this.state;

    let languageList = lang.filter((lang) => {
      return lang.language
        .toLocaleLowerCase()
        .includes(search.value.toLocaleLowerCase());
    });

    if (search.value === "") {
      let { data: lang } = await fetchLanguages();
      this.setState({ lang });
    } else {
      this.setState({ lang: languageList });
    }
  };
  render() {
    const { length: count } = this.state.lang;
    const { lang, pageCount, currentPage } = this.state;
    const languages = paginate(lang, pageCount, currentPage);

    if (count === 0) {
      return <LoaderImage />;
    }
    return (
      <React.Fragment>
        <SearchBar onChange={this.handleSearch} />
        {languages.map((lang) => {
          return (
            <div style={{ float: "left", margin: "25px" }}>
              <CardBox title={lang.language} listItems={lang.tags} />
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            bottom: "0",
          }}
        >
          <Paginate
            itemsCount={count}
            pageCount={pageCount}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          ></Paginate>
        </div>
      </React.Fragment>
    );
  }
}

export default LanguageList;
