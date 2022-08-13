import React from "react";
import ContentModel from "../model/contentModel";
import { useAirBoxModel } from "../model/airboxModels";
import { observer } from "mobx-react-lite";

interface BoxCardProp {
  box: ContentModel
}

const BoxCard = observer((prop: BoxCardProp) => {
  const airBoxModel = useAirBoxModel();

  const getBoxDom = (box: ContentModel) => {
    switch (box.type.split('/')[0]) {
      case 'text':
        return UrlBox(prop.box.content)
      case 'image':
        return ImageBox(prop.box)
      default:
        return UrlBox(prop.box.refUrl!)
    }
  }

  const boxStyle: React.CSSProperties = {
    flex: '1',
    paddingBlock: '10px',
    paddingInline: '20px',
    border: '2px solid lightgrey',
    borderRadius: '5px',
    margin: '5px',
    overflowWrap: 'break-word',
  };

  const btnGroupStyle: React.CSSProperties = {
    marginTop: '5px',
    borderTop: '2px solid lightgrey',
    paddingTop: '5px',
  };

  return (
    <div style={boxStyle}>
      {getBoxDom(prop.box)}
      <div style={btnGroupStyle}>
        <button onClick={() => { airBoxModel.removeItem(prop.box.id) }}>Delete</button>
        <button onClick={() => { navigator.clipboard.writeText(prop.box.content) }}>Copy</button>
        {airBoxModel.getUpdatingItemID === prop.box.id ? <span>Loading...</span> : null}
      </div>
    </div>
  );
})

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

const ImageBox = (box: ContentModel) => {
  return (
    <img src={box.refUrl} alt={box.content} height={200} />
  );
}

export default BoxCard