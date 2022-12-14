import React, { useEffect, useState } from "react";

function App() {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])
    const [searchInfo, setSearchInfo] = useState({})
    const [loading, setLoading] = useState(false)

    const handleSearch = async e => {
        e.preventDefault();
        if (search === '') return;

        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf=8&format=json&origin=*&srlimit=20&srsearch=${search}`;

        setLoading(true);
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw Error(response.statusText)
        }

        const json = await response.json();

        setResults(json.query.search);
        console.log(json.query.search)
        setSearchInfo(json.query.searchinfo);
    }

    useEffect(() => {
        setLoading(false);
    }, [results, searchInfo]);

	return (
		<div className="App">
            <header>
                <h1>Wiki Seeker</h1>
                <form className="search-box" onSubmit={handleSearch}>
                    <input
                        type="search" 
                        placeholder="What are you looking for?" 
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </form>
                {(searchInfo.totalhits) ? <p>Search Results: {searchInfo.totalhits}</p> : ""}
                {(loading) ? <span className="loading"></span> : ""}
            </header>
            <div className="results">
                {
                    results.map((result, index) => {
                        const url = `https://en.wikipedia.org?curid=${result.pageid}`

                        return (
                            <div key={index} className="result">
                                <h3>{result.title}</h3>
                                <p dangerouslySetInnerHTML={{__html: result.snippet}}></p>
                                <a href={url} target="_blank" rel="noreferrer">Read More</a>
                            </div>
                        )
                    })
                }
                
            </div>
		</div>
	);
}

export default App;
