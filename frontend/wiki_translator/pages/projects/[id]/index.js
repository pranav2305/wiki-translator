import {ProjectURL} from '../../../utils/constants';
import { sendReq } from '../../../utils/requests';
import { useState, useEffect, createRef } from 'react';
import Link from "next/link";

const DetailedProject = ({project}) => {

    const [sentenceRefs, setSentenceRefs] = useState([]);

    useEffect(()=> {
        const tokenCookie = document.cookie;
        if (!tokenCookie) {
            router.push('/login');
        }
        if (project.sentences.length) {
            console.log(project.sentences.length);
            let sentenceRefs = [];
            for (let i = 0; i < project.sentences.length; i++) {
                sentenceRefs.push(createRef());
            }
            setSentenceRefs(sentenceRefs);
        }
    }, [])

    const submitSentences = async () => {
        const tokenCookie = document.cookie;
        if (!tokenCookie) {
            router.push('/login');
        }
        const sentences = sentenceRefs.map(ref => {
            return {
                pk: ref.current.id,
                translated_sentence: ref.current.value
            }
        });
        const data = JSON.stringify(sentences);
        try {
            const response = await sendReq(`${ProjectURL}${project.pk}/update/`, tokenCookie, 'PATCH', data);
            if (response.status === 204) {
                alert('Sentences updated');
            }
        }
        catch (err) {
            console.log(err);
            router.push('/404');
        }

    }

    return (
        <div className="container">
            <h1 className="project-title">{project.title}</h1>
            <div className="inner-container">
                <p className="lang">{project.language}</p>
                <Link href={`/projects/${project.pk}/users`}><p className="link">View collaborators</p></Link>
                <div className="form-container">
                    {project.sentences.length!==0 && project.sentences.map((sentence, i) => (
                        <div className="row" key={sentence.pk}>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="original_sentence">Original Sentence</label>
                                    <textarea className="form-control" id="original_sentence" rows="3" defaultValue={sentence.original_sentence} disabled></textarea>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="translated_sentence">Translated Sentence</label>
                                    {sentenceRefs && sentenceRefs[i] && <textarea className="form-control" id={sentence.pk} rows="3" defaultValue={sentence.translated_sentence} ref={sentenceRefs[i]}></textarea>}
                                </div>
                            </div>
                        </div>
                    ))}
                    {project.sentences.length===0 && <p>No sentences yet</p>}
                    {project.sentences.length!==0 && <button type="button" className="btn btn-primary" onClick={submitSentences}>Submit</button>}
                </div>
            </div>
        </div>
    )
}

export default DetailedProject;

export async function getServerSideProps({query, req, res}) {
    const tokenCookie = req.headers.cookie;
    if (!tokenCookie) {
        res.writeHead(302, {
            Location: '/login'
        });
        res.end();
    }
    var project = {};
    if (query.id) {
        try {
            project = await sendReq(`${ProjectURL}${query.id}/`, tokenCookie);
        }
        catch (err) {
            console.log(err);
            res.writeHead(302, {
                Location: '/404'
            });
            res.end();
        }
    }
    else {
        res.writeHead(302, {
            Location: '/404'
        });
        res.end();
    }
    return {
        props: {
            project: project
        },
    }
}