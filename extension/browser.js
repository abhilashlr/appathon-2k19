/**
 * We need to add this on all pages of FS as of now until this becomes a
 * feature of MP app.
 * Install CJS plugin for chrome at this point in time. Copy and paste this
 * snippet inside your freshsales application of CJS.
 */

window.onmessage = ({
  data
}) => {
  if (data.application !== 'freshsales') {
    return;
  }

  window[data.params.actor](data.params);
};

function navigateToDetailPage({ entity, entityID }) {
  window.location.replace(_urlParameterize(`${window.location.origin}/${_pluralize(entity)}/show/${entityID}?`));
}

function navigateToListView({ entity, queryParams }) {
  let url = _urlParameterize(`${window.location.origin}/${_pluralize(entity)}/view/custom?q[]=${queryParams}&`);

  console.log(url);

  window.location.replace(url);
}

function _urlParameterize(url) {
  return `${url}dev=true`;
}

function _pluralize(value) {
  return `${value}s`;
}
