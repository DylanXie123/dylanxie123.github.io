import React, { useContext } from "react";
import Box from "../model/box";
import { AirBoxModelContext } from "../model/box_model";

interface BoxCardProp {
  box: Box
}

const BoxCard = (prop: BoxCardProp) => {
  const airBoxModel = useContext(AirBoxModelContext);

  const getBoxDom = (box: Box) => {
    switch (box.boxType.split('/')[0]) {
      case 'text':
        return UrlBox(prop.box.content)
      case 'image':
        return ImageBox(prop.box)
      default:
        return UrlBox(prop.box.refUrl!)
    }
  }

  return (
    <div style={{ flex: '1 200px', boxSizing: 'border-box', maxWidth: '100%', border: '1px solid', overflowWrap: 'break-word' }}>
      {getBoxDom(prop.box)}
      <button onClick={() => { airBoxModel.delete(prop.box) }}>Delete</button>
      <button onClick={() => { navigator.clipboard.writeText(prop.box.content) }}>Copy</button>
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

const ImageBox = (box: Box) => {
  return (
    <img src={box.refUrl} alt={box.content} height={200} />
  );
}

export default BoxCard