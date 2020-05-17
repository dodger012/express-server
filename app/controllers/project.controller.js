/* eslint-disable consistent-return */
const Project = require('../models/project.model.js');

exports.create = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Project content can not be empty'
    });
  }

  const project = new Project({
    title: req.body.title || 'Untitled Project',
    content: req.body.content
  });

  project
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Project.'
      });
    });
};

exports.findAll = (req, res) => {
  Project.find()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message:
          err.message || 'Some error occurred while getting the Projects.'
      })
    );
};

exports.findOne = (req, res) => {
  Project.findById(req.params.projectId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Project does not exist with id ${req.params.projectId}`
        });
      }
      return res.send(data);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Project not found with id ${req.params.projectId}`
        });
      }
      return res.status(500).send({
        message: `Error retrieving project with id ${req.params.projectId}`
      });
    });
};

exports.update = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Project content cannot be empty'
    });
  }
  Project.findByIdAndUpdate(
    {
      title: req.body.title || 'Untitled Project',
      content: req.body.content
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Project does not exist with id ${req.params.projectId}`
        });
      }
      return res.send(data);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Project not found with id ${req.params.projectId}`
        });
      }
      return res.status(500).send({
        message: `Error retrieving project with id ${req.params.projectId}`
      });
    });
};

exports.delete = (req, res) => {
  Project.findByIdAndRemove(req.params.projectId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Project does not exist with id ${req.params.projectId}`
        });
      }
      return res.send({ message: 'Project deleted successfully' });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Project not found with id ${req.params.projectId}`
        });
      }
      return res.status(500).send({
        message: `Could not delete project with id ${req.params.projectId}`
      });
    });
};
