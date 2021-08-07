import React from 'react';
import withContext from "../withContext"

const Search = (props) => {
    
    function onChange(e) {
        props.context.handleChange(e)
    }

   

    return (
        <>
            <div className="field has-addons">
                <div className="control">
                    <input className="input" type="text" placeholder="Find Product" onChange={onChange}/>
                    </div>
                    <div className="control">
                        <div className="button is-info" >
                            Search
                        </div>
                    </div>
                </div>
        </>
    );
}


export default withContext(Search);