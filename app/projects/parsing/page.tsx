import React from 'react';

export default function SCOTUSDataParsing() {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-4xl font-bold my-6">SCOTUS Data Parsing Through GPT API</h1>

            <section className="my-8">
                <h2 className="text-2xl font-semibold my-4">Introduction</h2>
                <p className="text-lg mb-4">
                    In this project, we developed a comprehensive parsing algorithm to extract and process legal data
                    from an Excel file using the GPT API. The primary goal was to automate the identification and
                    categorization of individuals involved in legal cases, including their positions, law firms, cities,
                    and states. By leveraging the power of multiple GPT-4 models, we aimed to ensure the accuracy and
                    reliability of the parsed data through a multi-pass approach and conflict resolution mechanisms.
                </p>
                <p className="text-lg mb-4">
                    The parsing process is divided into three primary stages: parsing raw data through GPT, processing
                    and comparing parsed data, and final processing on the compiled data. Each stage involves specific
                    tasks and methodologies to achieve the desired outcomes. This document provides a detailed overview
                    of the entire process, including the use of various GPT models, the handling of inconsistencies, and
                    the final aggregation and extraction of unique names for further analysis.
                </p>
                <p className="text-lg mb-4">
                    By the end of the project, we successfully parsed a substantial dataset of legal case information,
                    achieving a high degree of accuracy in identifying and categorizing individuals. This project
                    showcases the capabilities of GPT models in data processing and highlights the importance of
                    multi-pass approaches and conflict resolution in ensuring data integrity. The following sections
                    detail each stage of the parsing process, from initial data input to the final extraction of unique
                    names, providing insights into the methodologies and tools used throughout the project.
                </p>
            </section>

            <section className="my-8">
                <h2 className="text-2xl font-semibold my-4">A Summary of the Parsing Algorithm</h2>
                <p className="text-lg mb-4">
                    There are three primary stages of the parsing process:
                </p>
                <ol className="list-decimal list-inside ml-8 text-lg mb-4">
                    <li>Parse raw data through GPT</li>
                    <li>Process and compare parsed GPT data</li>
                    <li>Final processing on compiled data</li>
                </ol>
            </section>

            <section className="my-8">
                <h2 className="text-2xl font-semibold my-4">1. Parse Raw Data Through GPT</h2>
                <h3 className="text-xl font-semibold my-4">1.1 Send data to GPT API</h3>
                <p className="text-lg mb-4">
                    The first step of the algorithm is to read a data row from the Excel file and input that to the GPT
                    API to parse. An example row (row 10) from the data is shown below:
                </p>
                <table className="table-auto w-full text-left text-lg mb-4">
                    <thead>
                    <tr>
                        <th>Case Name</th>
                        <th>Docket No.</th>
                        <th>Parties (full case name)</th>
                        <th>Filing Type</th>
                        <th>Counsel</th>
                        <th>Filed date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>FORD MOTOR CO. v. BANDEMER</td>
                        <td>No. 19-369</td>
                        <td>FORD MOTOR COMPANY, Petitioner, v. ADAM BANDEMER, Respondent.</td>
                        <td>Initial Brief: Intervenor-Appellant</td>
                        <td>NEAL KUMAR KATYAL, SEAN MAROTTA, Counsel of Record, KIRTI DATLA, ERIN R. CHAPMAN, HOGAN
                            LOVELLS US LLP, Washington, DC, Counsel for Petitioner.
                        </td>
                        <td>18-Sep-19</td>
                    </tr>
                    </tbody>
                </table>
                <p className="text-lg mb-4">
                    We read and extract the counsel string from the data so that it can be passed into the GPT API. We
                    prompt GPT API with the following &quotSystem Instructions&quot:
                </p>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md">
  <pre className="whitespace-pre-wrap break-words">
    <code className="text-sm text-gray-800">
      SYSTEM_INSTRUCTIONS = ```<br/>
      You are a data processing assistant. In the given data, identify all individuals,
      their position, law firm, city, and state. Return the data in JSON format. Every
      lawyer should be associated to a law firm. Fill any cell where data is not
      available as N/A. The JSON should contain a list keyed with `individuals`
      listing all of the individuals in the data. The keys for each individual should be:
      `name`, `position`, `law_firm`, `city`, `state`<br/>
      ```
    </code>
  </pre>
                </div>

                <p className="text-lg mb-4">
                    The above string is sent to the GPT API as prompt instructions. Along with that, we send the string
                    of the unparsed counsels. From that above example, the string sent to GPT API would be:
                </p>
                <blockquote className="pl-4 border-l-4 border-blue-500 text-lg mb-4">
                    NEAL KUMAR KATYAL, SEAN MAROTTA, Counsel of Record, KIRTI DATLA, ERIN R. CHAPMAN, HOGAN LOVELLS US
                    LLP, Washington, DC, Counsel for Petitioner.
                </blockquote>
                <p className="text-lg mb-4">
                    This string sees no additional processing before GPT. It is sent in its raw format to the API. The
                    GPT API uses a messages list to keep track of the chat history. The initial prompt is sent as a
                    `system` instruction, and the unparsed string as a `user` message.
                </p>

                <h3 className="text-xl font-semibold my-4">1.2 GPT Models Used For Parsing</h3>
                <p className="text-lg mb-4">
                    A variety of GPT-4 Models were used for parsing. As the parsing was performed over the span of a few
                    weeks, a few GPT models were released. We thought that it would be a good idea to run the data
                    through different models and compare their outputs. As such, different parts of the data were run
                    through various different GPT-4 models. The models we used were: `gpt-4-1106-preview` ,
                    `gpt-4-turbo-2024-04-09`, and `gpt-4o-2024-05-13`.
                </p>
                <p className="text-lg mb-4">
                    The following table describes how the various models were utilized in the parsing of the data. The
                    groups show the ranges the data were parsed in.
                </p>
                <table className="table-auto w-full text-left text-lg mb-4">
                    <thead>
                    <tr>
                        <th>Data Section</th>
                        <th>First Pass</th>
                        <th>Second Pass</th>
                        <th>Third Pass (conflict resolution)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>0k - 5k</td>
                        <td>gpt-4-1106-preview</td>
                        <td>gpt-4-1106-preview</td>
                        <td>gpt-4o-2024-05-13</td>
                    </tr>
                    <tr>
                        <td>5k - 15k</td>
                        <td>gpt-4-1106-preview</td>
                        <td>gpt-4-1106-preview</td>
                        <td>gpt-4o-2024-05-13</td>
                    </tr>
                    <tr>
                        <td>15k - 30k</td>
                        <td>gpt-4-1106-preview</td>
                        <td>gpt-4-turbo-2024-04-09</td>
                        <td>gpt-4o-2024-05-13</td>
                    </tr>
                    <tr>
                        <td>30k - 45k</td>
                        <td>gpt-4-1106-preview</td>
                        <td>gpt-4-turbo-2024-04-09</td>
                        <td>gpt-4o-2024-05-13</td>
                    </tr>
                    </tbody>
                </table>
                <p className="text-lg mb-4">
                    Note: we chose not to re-run the second parse of the 0k-15k section of the data as we judged that
                    the new model (`gpt-4-turbo-2024-04-09`), while different, did not provide a significant enough
                    improvement to justify the cost of re-running the parser. However, it was different and provided
                    enough improvement over simply doing two passes with the `gpt-4-1106-preview` that we decided that
                    it was worth it to switch over the new model.
                </p>
                <p className="text-lg mb-4">
                    All conflict resolution was run with the `gpt-4o-2024-05-13` model as it provided a third--and
                    new--model that was different from both passes.
                </p>

                <h3 className="text-xl font-semibold my-4">1.3 Receive and Process GPT Data</h3>
                <p className="text-lg mb-4">
                    We have instructed GPT to return the data in a JSON format, therefore, the result is very structured
                    although GPT sometimes appends extraneous data in front of the open curly brace of a JSON object. We
                    parse the return string and only keep the data contained between the first opening curly brace
                    and the last closing curly brace.
                </p>
                <p className="text-lg mb-4">
                    The resulting JSON contains an `individuals` list containing nested JSONs with the key-value pairs
                    corresponding to the requested data: name, position, law_firm, city, and state. The resulting JSON
                    object returned by GPT from the above example is shown below:
                </p>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md">
  <pre className="whitespace-pre-wrap break-words">
    <code className="text-sm text-gray-800">
{`
{
  "individuals": [
    {
      "name": "Neal Kumar Katyal",<br>
      "position": "Counsel of Record",<br>
      "law_firm": "Hogan Lovells US LLP",<br>
      "city": "Washington",<br>
      "state": "DC"<br>
    },<br>
    {
      "name": "Sean Marotta",<br>
      "position": "Counsel of Record",<br>
      "law_firm": "Hogan Lovells US LLP",<br>
      "city": "Washington",<br>
      "state": "DC"<br>
    },<br>
    {
      "name": "Kirti Datla",<br>
      "position": "N/A",<br>
      "law_firm": "Hogan Lovells US LLP",<br>
      "city": "Washington",<br>
      "state": "DC"<br>
    },<br>
    {
      "name": "Erin R. Chapman",<br>
      "position": "N/A",<br>
      "law_firm": "Hogan Lovells US LLP",<br>
      "city": "Washington",<br>
      "state": "DC"<br>
    }<br>
  ]<br>
}
`}
</code>
  </pre>
                </div>

                <p className="text-lg mb-4">
                    This data is written to a result JSON file along with the pertinent information from the original
                    row for further processing. A unique JSON file is created for each row from the original data and is
                    named by the row. Since our example came from row 10, the final JSON file is `10-info.json` which
                    looks like:
                </p>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                      <pre className="whitespace-pre-wrap break-words">
                        <code className="text-sm text-gray-800">
                        {`
{
  "individuals": [
    ... see above ...
  ],
  "original_row": 10,
  "case_name": "FORD MOTOR CO. v. BANDEMER",
  "docket_number": [
    "No. 19-369"
  ],
  "filing_type": [
    "Initial Brief: Intervenor-Appellant"
  ],
  "date": "2019-09-18"
}
                        `}
                        </code>
                    </pre>
                </div>
            </section>

            <section className="my-8">
                <h2 className="text-2xl font-semibold my-4">2. Process and Compare Parsed GPT Data</h2>
                <h3 className="text-xl font-semibold my-4">2.1 Limitations of the GPT API</h3>
                <p className="text-lg mb-4">
                    During our testing, we found that while usually accurate, the GPT API sometimes gave inconsistent or
                    inaccurate results. They happened often enough that we decided that parsing the dataset through the
                    API twice would be helpful with catching these mistakes. As such, after step 1, we ended up with two
                    separate sets of uniquely generated data as the GPT. This uniqueness is a product of how the GPT
                    algorithm works meaning results are never deterministic. Therefore the same input can and often does
                    produce different result. We judged the probability of both runs making the same mistake to be quite
                    unlikely, and therefore settled with running twice.
                </p>

                <h3 className="text-xl font-semibold my-4">2.2 Aggregating the Results</h3>
                <p className="text-lg mb-4">
                    Many stages were used when aggregating the results from the multiple GPT runs. When comparing the
                    files, we identified five unique scenarios that required different levels of intervention to produce
                    a singular *aggregated* output. These are:
                </p>
                <ol className="list-decimal list-inside ml-8 text-lg mb-4">
                    <li>
                        <strong>Identical Profile:</strong> This was a trivial case. The two GPT runs produced two
                        identical profile. In this case, we took the first file.
                    </li>
                    <li>
                        <strong>Identical Names:</strong> In this case, all names for a specific case (row) being parsed
                        were identical, however some differences existed in the parsing of the other fields (position,
                        law firm, city, state). In this case, since we found that GPT often differed slightly in
                        formatting but not in content, we simply took the first file.
                    </li>
                    <li>
                        <strong>Highly Similar Names:</strong> In cases where the names were not identical, we utilized
                        a *Fuzzy Partial Ratio* match from the <a href="https://github.com/seatgeek/thefuzz"
                                                                  className="text-blue-500 underline">The
                        Fuzz</a> Python package. For more information on how fuzzy matching works, see <a
                        href="https://chairnerd.seatgeek.com/fuzzywuzzy-fuzzy-string-matching-in-python/"
                        className="text-blue-500 underline">this article</a>. We selected a partial ratio threshold of
                        85 or higher to designate a `highly similar name.` This means that while GPT may have generated
                        slightly different variations of the name, a similarity score above 85 indicates that they refer
                        to the same individual.
                    </li>
                    <li>
                        <strong>Name List Length Matches - Names Highly Different:</strong> There are two subclasses in
                        this category: mismatched order, and completely different parses. The first category is a result
                        of how the comparison algorithm compares index to index strictly. If a name appears as the first
                        index in one parsing iteration and happens to appear in the second index in another iteration,
                        it would result in a `highly different` mismatch. In this case, the comparison algorithm drops
                        the strict index requirement and attempts to match to any index of the list.
                    </li>
                    <li>
                        <strong>Name List Length Mismatch:</strong> In cases where the length of the list of names for a
                        given case did not match, we reran the row through the parsing algorithm. As GPT-4o had just
                        become available when we were set to run this third pass, we chose to use it as to ensure that
                        all comparisons to a third run were against a new third model instead of comparing with the same
                        model. We then compared this third run with the existing two runs. If they matched, we chose the
                        observations that agreed with each other and discarded the mismatching run.
                    </li>
                </ol>
                <p className="text-lg mb-4">
                    We processed a total of 147247 names. The statistics of the number of names in each category are:
                </p>
                <table className="table-auto w-full text-left text-lg mb-4">
                    <thead>
                    <tr>
                        <th>Category</th>
                        <th>Count</th>
                        <th>Percent</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Identical Profile</td>
                        <td>113027</td>
                        <td>76.76%</td>
                    </tr>
                    <tr>
                        <td>Identical Names</td>
                        <td>28786</td>
                        <td>19.55%</td>
                    </tr>
                    <tr>
                        <td>Highly Similar Names</td>
                        <td>1780</td>
                        <td>1.21%</td>
                    </tr>
                    <tr>
                        <td>Names Highly Different</td>
                        <td>141</td>
                        <td>0.10%</td>
                    </tr>
                    <tr>
                        <td>Name List Length Mismatch - Matched With Tiebreaker</td>
                        <td>3513</td>
                        <td>2.39%</td>
                    </tr>
                    <tr>
                        <td>Name List Length Mismatch - Could Not Match <strong>(ROWS)</strong></td>
                        <td>67</td>
                        <td>--</td>
                    </tr>
                    </tbody>
                </table>
                <p className="text-lg mb-4">
                    The final output of the comparison is exported to a JSON file containing all names parsed from the
                    data.
                </p>
            </section>

            <section className="my-8">
                <h2 className="text-2xl font-semibold my-4">3. Final Processing on Compiled Data</h2>
                <h3 className="text-xl font-semibold my-4">3.1 Finding Unique Names</h3>
                <p className="text-lg mb-4">
                    At this stage, we have a list of 147247 names extracted from the council field through the process
                    described above. For further analysis, we want unique names, and having the distinct first, middle,
                    and last names available as separate fields for query.
                </p>
                <h3 className="text-xl font-semibold my-4">3.2 Extracting First, Middle, and Last Name</h3>
                <p className="text-lg mb-4">
                    Through a process similar to the initial parse, the list of unique names were once again sent
                    through the GPT API. The system instructions were:
                </p>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                      <pre className="whitespace-pre-wrap break-words">
                        <code className="text-sm text-gray-800">
                            {`
"Given this list of names, extract the first, middle, and last names along with any suffixes and prefixes if applicable. Format the data as json. Key the list of parsed names with people with each person having the keys: first_name, middle_name, last_name, prefix, suffix. Use 'N/A' if any key is not applicable"
`}
                        </code>
                        </pre>
                </div>
                    <p className="text-lg mb-4">
                    This time, we determined that GPT 3.5, specifically `gpt-3.5-turbo-0125`, would be sufficient to
                    process the data and therefore chose to use it both to save cost and time. This data was also
                    exported as a JSON and later flattened to a CSV file for sharing.
                </p>
            </section>

            <section className="my-8">
                <h2 className="text-2xl font-semibold my-4">Conclusion</h2>
                <p className="text-lg mb-4">
                    The Parsing Algorithm Project exemplifies the power and versatility of GPT models in automating
                    complex data extraction and processing tasks. In the project debrief, we discussed that before
                    access to GPT models, this task would have to been performed manually, likely costing over \$10,000.
                    The API usage of for processing this data ended up costing about \$1000. A substantial saving. By
                    leveraging multiple iterations of GPT-4 models and employing a structured, multi-pass approach, we
                    achieved a high degree of accuracy in parsing and categorizing legal case information from a large
                    dataset. The methodology involved careful planning, model selection, and the implementation of
                    conflict resolution strategies to ensure the reliability of the parsed data.
                </p>
                <p className="text-lg mb-4">
                    Throughout the project, we encountered and addressed various challenges, such as inconsistent
                    outputs from the GPT API and the need for efficient data aggregation techniques. Our approach to
                    running the data through multiple models and comparing results proved effective in mitigating errors
                    and ensuring data integrity.
                </p>
                <p className="text-lg mb-4">
                    The final stage of the project involved extracting unique names and breaking them down into distinct
                    components, such as first, middle, and last names, along with any prefixes or suffixes. This
                    detailed level of data processing enables more granular analysis and facilitates further research
                    and application.
                </p>
                <p className="text-lg mb-4">
                    In summary, this project not only highlights the capabilities of advanced language models like GPT-4
                    but also underscores the importance of thoughtful algorithm design and rigorous testing. By
                    integrating multiple tools and methodologies, we successfully created a robust parsing algorithm
                    that can serve as a foundation for future data processing projects. The insights gained and the
                    methodologies developed during this project will undoubtedly contribute to ongoing advancements in
                    automated data extraction and analysis.
                </p>
            </section>

        </div>
    );
}
