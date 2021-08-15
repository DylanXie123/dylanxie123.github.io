import React, { useContext } from "react";
import Box from "../model/box";
import { AirBoxModelContext } from "../model/box_model";

interface BoxCardProp {
  box: Box
}

const BoxCard = (prop: BoxCardProp) => {
  const airBoxModel = useContext(AirBoxModelContext);
  return (
    <div style={{ border: '1px solid' }}>
      {UrlBox(prop.box.content)}
      <button onClick={() => { airBoxModel.delete(prop.box.id) }}>Delete</button>
    </div>
  );
}

const UrlBox = (content: string) => {
  const urlRegexp = /https?:\/\/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_.~#?&//=]*/g;
  const urls = Array.from(content.matchAll(urlRegexp));

  if (urls.length === 0) {
    return <span>{content}</span>
  }

  const elements: Array<JSX.Element> = [];
  for (let index = 0; index < urls.length; index++) {
    // text-url-text-...-url-text
    const url = urls[index];
    const link = content.slice(url.index, url.index! + url[0].length);

    if (index === 0 && url.index! > 0) {
      elements.push(
        <span key={'textSpan-begin'}>{content.slice(0, url.index)}</span>
      );
    }

    if (index === urls.length - 1) {
      const textContent = content.slice(url.index! + link.length, content.length);
      elements.push(
        <a key={`a-${index}`} href={link} target={'_blank'} rel={'noreferrer'}>{link}</a>,
        <span key={`textSpan-${index}`}>{textContent}</span>
      );
      break;
    }

    // later str
    const laterUrl = urls[index + 1];
    const textContent = content.slice(url.index! + link.length, laterUrl.index);
    elements.push(
      <a key={`a-${index}`} href={link} target={'_blank'} rel={'noreferrer'}>{link}</a>,
      <span key={`textSpan-${index}`}>{textContent}</span>
    );
    
  }
  return elements
}

export default BoxCard