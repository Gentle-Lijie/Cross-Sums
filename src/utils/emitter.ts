import mitt from "mitt";

type Events = {
  [key: string]: any;
};

const emitter = mitt<Events>();

export default emitter;
