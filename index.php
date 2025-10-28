<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once __DIR__ . '/vendor/autoload.php';

// Initialize Twig
$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/templates');
$twig = new \Twig\Environment($loader, [
    'cache' => false, // set to 'cache' => __DIR__.'/cache' in production
]);

// Get ?page= from URL or default to 'landing'
$page = $_GET['page'] ?? 'landing';

switch ($page) {
  case 'landing':
    echo $twig->render('pages/landing.twig', [
      'title' => 'TicketSolve – Home',
    ]);
    break;

  case 'login':
    echo $twig->render('pages/login.twig', [
      'title' => 'TicketSolve – Login',
    ]);
    break;

  case 'register':
    echo $twig->render('pages/register.twig', [
      'title' => 'TicketSolve – Register',
    ]);
    break;
  
  case 'dashboard':
    echo $twig->render('pages/dashboard.twig', ['title' => 'TicketSolve – Dashboard']);
    break;
  
  case 'tickets':
    echo $twig->render('pages/ticketpage.twig', ['title' => 'TicketSolve – Create Ticket']);
    break;
}

