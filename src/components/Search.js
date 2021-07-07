import React, {useState, useEffect} from 'react'
import axios from 'axios';
function Search() {

  const [term, setTerm] = useState('programming');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  useEffect(() => {
    console.log("I run on first render and whenever term value changes");
    const search = async () => {
      const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term
        }
      });
      setResults(data.query.search);
    }
    search();    
  }, [debouncedTerm]);

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet}}></span>
          {/* {result.snippet} */}
        </div>
      </div>
    )
  });

  return (
    <div>
      <form className="ui form" onSubmit={(e) => this.onFormSubmit(e)}>
        <div className="field">
          <label>Enter search term</label>
          <input
            className="input"
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}/>
        </div>
      </form>
      <div className="ui celled list">
        {renderedResults}
      </div>
    </div>
  )
}

export default Search
