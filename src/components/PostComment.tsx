import styled from "styled-components";

const Span = styled.span`

`;
const P = styled.p`

`;

export default function PostComment(props: {autor: string, content: string}){
    return (<div className='postComment'>
        <Span>{props.autor}</Span>
        <P>{props.content}</P>
    </div>);
}
