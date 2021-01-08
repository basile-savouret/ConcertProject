<?php

namespace App\Entity;

use App\Repository\ShowRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ShowRepository::class)
 * @ORM\Table(name="`show`")
 */
class Show
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("normalized")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Band::class, inversedBy="shows")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("normalized")
     */
    private $band;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("normalized")
     */
    private $tourName;

    /**
     * @ORM\ManyToOne(targetEntity=Hall::class, inversedBy="shows")
     * @Groups("normalized")
     */
    private $hall;

    /**
     * @ORM\Column(type="bigint")
     * @Groups("normalized")
     */
    private $date;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBand(): ?Band
    {
        return $this->band;
    }

    public function setBand(?Band $band): self
    {
        $this->band = $band;

        return $this;
    }

    public function getTourName(): ?string
    {
        return $this->tourName;
    }

    public function setTourName(?string $tourName): self
    {
        $this->tourName = $tourName;

        return $this;
    }

    public function getHall(): ?Hall
    {
        return $this->hall;
    }

    public function setHall(?Hall $hall): self
    {
        $this->hall = $hall;

        return $this;
    }

    public function getDate(): ?int
    {
        return $this->date;
    }

    public function setDate(int $date): self
    {
        $this->date = $date;

        return $this;
    }
}
