export default function applyPrototypes(component) {
  component.process = window.process;
  component.require = window.require;
  component.rai = window.rai;
  component.global = global;
  return component;
}
